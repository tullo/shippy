package main

import (
	"context"

	"github.com/jmoiron/sqlx"
	uuid "github.com/satori/go.uuid"
	proto "github.com/tullo/shippy/shippy-service-user/proto"
)

type User struct {
	ID       string `sql:"id"`
	Name     string `sql:"name"`
	Email    string `sql:"email"`
	Company  string `sql:"company"`
	Password string `sql:"password"`
}

type Repository interface {
	GetAll(ctx context.Context) ([]*User, error)
	Get(ctx context.Context, id string) (*User, error)
	Create(ctx context.Context, user *User) error
	GetByEmail(ctx context.Context, email string) (*User, error)
}

type PostgresRepository struct {
	db *sqlx.DB
}

func NewPostgresRepository(db *sqlx.DB) *PostgresRepository {
	return &PostgresRepository{db}
}

func MarshalUserCollection(users []*proto.User) []*User {
	u := make([]*User, len(users))
	for _, val := range users {
		u = append(u, MarshalUser(val))
	}
	return u
}

func MarshalUser(user *proto.User) *User {
	return &User{
		ID:       user.Id,
		Name:     user.Name,
		Email:    user.Email,
		Company:  user.Company,
		Password: user.Password,
	}
}

func UnmarshalUserCollection(users []*User) []*proto.User {
	u := make([]*proto.User, len(users))
	for _, val := range users {
		u = append(u, UnmarshalUser(val))
	}
	return u
}

func UnmarshalUser(user *User) *proto.User {
	return &proto.User{
		Id:       user.ID,
		Name:     user.Name,
		Email:    user.Email,
		Company:  user.Company,
		Password: user.Password,
	}
}

func (r *PostgresRepository) GetAll(ctx context.Context) ([]*User, error) {
	var users []*User
	if err := r.db.SelectContext(ctx, &users, "select * from users"); err != nil {
		return users, err
	}

	return users, nil
}

func (r *PostgresRepository) Get(ctx context.Context, id string) (*User, error) {
	var user User
	if err := r.db.GetContext(ctx, &user, "select * from users where id = $1", id); err != nil {
		return nil, err
	}

	return &user, nil
}

// Create a new user
func (r *PostgresRepository) Create(ctx context.Context, user *User) error {
	user.ID = uuid.NewV4().String()
	query := "insert into users (id, name, email, company, password) values ($1, $2, $3, $4, $5)"
	_, err := r.db.ExecContext(ctx, query, user.ID, user.Name, user.Email, user.Company, user.Password)
	return err
}

// GetByEmail fetches a single user by their email address
func (r *PostgresRepository) GetByEmail(ctx context.Context, email string) (*User, error) {
	query := "select * from users where email = $1"
	var user User
	if err := r.db.GetContext(ctx, &user, query, email); err != nil {
		return nil, err
	}
	return &user, nil
}
