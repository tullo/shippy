# Notes

```sh
micro shippy.service.user --help
NAME:
	micro shippy.service.user

VERSION:
	latest

USAGE:
	micro shippy.service.user [command]

COMMANDS:
	userService auth
	userService create
	userService get
	userService getAll
	userService validateToken

# =====================================================
curl -H "Content-Type:application/json" -d '{"name": "Foo","company": "Bar","email": "sammmy@gmail.com","password" : "secret"}' http://localhost:8080/shippy.service.user/userService/create

# =====================================================
micro shippy.service.user userService getAll
{
	"users": [
		{},
		{},
		{
			"id": "1a123767-f919-4e0f-8905-e904c5631b26",
			"password": "$2a$10$z3wNLqPrzwMHUyFy8yZITuBHoGVR0nHd0gatOPRR4ypniYrUM43o6"
		},
		{
			"id": "232a7dad-db86-4a95-b322-083fb8e66721",
			"name": "Foo",
			"company": "Bar",
			"email": "sammmy@gmail.com",
			"password": "$2a$10$/LslCeuaW641Vkrn4Z7foOoaw4sninpv7F6w2GSiHm.p3me1GoVt6"
		}
	]
}

# =====================================================
micro shippy.service.user userService get --id 232a7dad-db86-4a95-b322-083fb8e66721
{
	"user": {
		"id": "232a7dad-db86-4a95-b322-083fb8e66721",
		"name": "Foo",
		"company": "Bar",
		"email": "sammmy@gmail.com",
		"password": "$2a$10$/LslCeuaW641Vkrn4Z7foOoaw4sninpv7F6w2GSiHm.p3me1GoVt6"
	}
}

```