package main

import (
	"time"

	"github.com/dgrijalva/jwt-go/v4"
	proto "github.com/tullo/shippy/shippy-service-user/proto"
)

var (
	// Define a secure key string used
	// as a salt when hashing our tokens.
	// Please make your own way more secure than this,
	// use a randomly generated md5 hash or something.
	key = []byte("mySuperSecretKey")
)

// CustomClaims is our custom metadata, which will be hashed
// and sent as the second segment in our JWT
type CustomClaims struct {
	User *proto.User
	jwt.StandardClaims
}

type TokenService struct {
	repo Repository
}

// Decode a token string into a token object
func (srv *TokenService) Decode(token string) (*CustomClaims, error) {

	// Parse the token
	tokenType, err := jwt.ParseWithClaims(token, &CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return key, nil
	})

	// Validate the token and return the custom claims
	if claims, ok := tokenType.Claims.(*CustomClaims); ok && tokenType.Valid {
		return claims, nil
	}

	return nil, err
}

// Encode a claim into a JWT
func (srv *TokenService) Encode(user *proto.User) (string, error) {
	now := time.Now()
	// Create the Claims
	claims := CustomClaims{
		user,
		jwt.StandardClaims{
			Issuer:    "shippy.service.user",
			IssuedAt:  jwt.NewTime(float64(now.Unix())),
			ExpiresAt: jwt.NewTime(float64(now.Add(time.Hour).Unix())),
		},
	}

	// Create token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Sign token and return
	return token.SignedString(key)
}
