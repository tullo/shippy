package main

import (
	"fmt"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"github.com/micro/micro/v3/service/config"
	"github.com/micro/micro/v3/service/logger"
)

// NewConnection returns a new database connection instance
func NewConnection() (*sqlx.DB, error) {
	host := conf("pg.host")
	user := conf("pg.user")
	dbName := conf("pg.dbName")
	password := conf("pg.password")
	conn := fmt.Sprintf("host=%s user=%s dbname=%s password=%s sslmode=disable", host, user, dbName, password)
	db, err := sqlx.Connect("postgres", conn)
	if err != nil {
		return nil, err
	}

	return db, nil
}

func conf(key string) string {
	cf, err := config.Get(key)
	if err != nil {
		logger.Errorf("Error loading config: %v", err)
		return ""
	}

	val := cf.String("")
	if len(val) == 0 {
		logger.Errorf("Missing required config: %v", key)
		return ""
	}

	return val
}
