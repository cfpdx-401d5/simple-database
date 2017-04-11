# Simple Database

## Set up
Run in the console:
``` 
$ npm install
```

## Basic Functionality
### Save
```Save()``` is used for the creation of a new record.  It takes the arguments collection/table, an object containing the data you want to save, and a callback.

```
save(<collection>, <obj>, someFunction);
```

### Update
```Update()``` is used to update an existing record.  It takes the arguments collection/table and an object containing the updated information.
```
update(<collection>, <obj>);
```

### Remove
```Remove()``` is used to remove a record.  It takes the arguments collection/table, the id of the record you want to update, and a callback.
```
remove(<collection>, id, someFunction);
```

### Get
```Get()``` is used to retrieve a record. It takes the arguments collection/table, the id of the record you want to update, and a callback.
```
get(<collection>, id, someFunction);
```

### Get-All
```GetAll()``` is used to retrieve a list of all the records in a collection.  It takes the arguments collection/table and a callback.
```
getAll(<collection>, someFunction);
```