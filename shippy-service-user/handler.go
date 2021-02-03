package main

import (
	"context"
	"errors"
	"log"

	"github.com/micro/micro/v3/service"
	proto "github.com/tullo/shippy/shippy-service-user/proto"
	"golang.org/x/crypto/bcrypt"
)

type authable interface {
	Decode(token string) (*CustomClaims, error)
	Encode(user *proto.User) (string, error)
}

type handler struct {
	repository   Repository
	tokenService authable
	publischer   *service.Event
}

func (s *handler) Get(ctx context.Context, req *proto.User, res *proto.Response) error {
	result, err := s.repository.Get(ctx, req.Id)
	if err != nil {
		return err
	}

	user := UnmarshalUser(result)
	res.User = user

	return nil
}

func (s *handler) GetAll(ctx context.Context, req *proto.Request, res *proto.Response) error {
	results, err := s.repository.GetAll(ctx)
	if err != nil {
		return err
	}

	users := UnmarshalUserCollection(results)
	res.Users = users

	return nil
}

func (s *handler) Auth(ctx context.Context, req *proto.User, res *proto.Token) error {
	user, err := s.repository.GetByEmail(ctx, req.Email)
	if err != nil {
		return err
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		return err
	}

	token, err := s.tokenService.Encode(req)
	if err != nil {
		return err
	}

	res.Token = token
	return nil
}

func (s *handler) Create(ctx context.Context, req *proto.User, res *proto.Response) error {
	hashedPass, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	req.Password = string(hashedPass)
	if err := s.repository.Create(ctx, MarshalUser(req)); err != nil {
		return err
	}

	// Strip the password back out, so's we're not returning it
	req.Password = ""
	res.User = req

	if err := s.publishEvent(req); err != nil {
		return err
	}

	return nil
}

func (s *handler) ValidateToken(ctx context.Context, req *proto.Token, res *proto.Token) error {
	claims, err := s.tokenService.Decode(req.Token)
	if err != nil {
		return err
	}

	if claims.User.Id == "" {
		return errors.New("invalid user")
	}

	res.Valid = true
	return nil
}

func (s *handler) publishEvent(user *proto.User) error {
	user.Password = ""
	if err := s.publischer.Publish(context.TODO(), user); err != nil {
		log.Printf("[pub] failed: %v", err)
	}

	return nil
}
