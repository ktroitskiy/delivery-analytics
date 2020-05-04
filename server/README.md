# da-server

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers help                           # Show all commands
```

## DB migrations

```
$ sequelize migration:create --name=""     # Create migration
$ sequelize db:migrate                     # Apply migrations
$ sequelize db:migrate:undo                # Downgrade last migration
$ sequelize db:migrate:undo:all            # Downgrade all migrations
```

## DB seeders

```
$ sequelize seed:generate --name="users-seed"   # Create seed
$ sequelize db:seed:all                         # Apply seeds
$ sequelize db:seed:undo                        # Downgrade last seed
$ sequelize db:seed:undo:all                    # Downgrade all seeds
```
