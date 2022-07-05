# Kantin Kejujuran REST API

## Usage

Base URL `https://kantin-kejujuran-ichsnn.herokuapp.com/`

### API Endpoint

#### Signin

`POST` `/api/auth/signin`

Request body :

```json
{
  "id": "45615",
  "password": "password"
}
```

Response :

```json
  "id": "45615",
  "name": "username",
  "access_token": "thisisexampleaccesstoken.butnotlikethis.youcanreadthis?"
```

#### Signup

`POST` `/api/auth/signup`

Request body :

```json
{
  "id": "45615",
  "name": "yourname",
  "password": "password"
}
```

Response :

```json
{
  "message": "User created successfully"
}
```

#### User Auth

`GET` `/api/user/auth`

Headers :

`x-access-token` `thisisexampleaccesstoken.butnotlikethis.youcanreadthis?`

Response :

```json
{
  "id": "45615",
  "name": "yourname",
  "balance": 0
}
```

#### Sell Item

`POST` `/api/item/sell`

Headers :

`x-access-token` `thisisexampleaccesstoken.butnotlikethis.youcanreadthis?`

Form Data :

```console
user_id     : Text
name        : Text
description : Text
price       : Text
image       : File (img/*)
```

Response :

```json
{
  "message": "Item successfully created!"
}
```

#### Buy Item

`POST` `/api/item/buy`

Headers :

`x-access-token` `thisisexampleaccesstoken.butnotlikethis.youcanreadthis?`

Request body :

```json
{
  "id": "item_id"
}
```

#### Get List Item On Sell

`GET` `/api/item/onsell`

#### Get List Item On Sell and Sort

`GET` `/api/item/onsell/:sort`

sort list :

```josn
 - latest
 - oldest
 - az
 - za
 - low
 - high
```

#### Deposit User Balance

`POST` `/api/user/balance/deposit`

Headers :

`x-access-token` `thisisexampleaccesstoken.butnotlikethis.youcanreadthis?`

Request body :

```json
{
  "amount": "50000"
}
```

#### Withdraw User Balance

`POST` `/api/user/balance/withdraw`

Headers :

`x-access-token` `thisisexampleaccesstoken.butnotlikethis.youcanreadthis?`

Request body :

```json
{
  "amount": "50000"
}
```
