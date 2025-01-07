TODO 
Create a change password route 
and a update profile route without updating the password
this will be separate router and controller

TODO 2 
Curd Operation for product
CReate schema plus route and controller for product and point to be  noted that each product will have their respective creator reference '


TODO 3
Response helper.
create a generic response helper file name (send response)
complete remaining response using response helper

TODO 4
add pagination into getall and search
create a pagination helper to reuse in all 
create a new response helper (SendPagedResult)

{
  message,
  status code,
  success, 
  totalPage,
  page,
  limit,
  data
}

TODO 5
Create cart schema 
ADD User id reference 
auto calculate cart value

TODO 6
cart CRUD operation 
Create transaction schema cartId will be reference 
Transaction table will have user shipping data  transaction amount status and payment method 
Transaction Date is necessary.  