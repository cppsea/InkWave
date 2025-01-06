### UserSchema:
uuid : string</br>
creationDate : date</br>
deletionDate : date / null</br>
lastUpdated : date</br>
email : string (add email pattern)</br>
password : string (hashed)</br>

### NoteSchema:
objectID : objectId</br>
userID : UserSchema</br>
name : string</br>
image : ImageSchema</br>
pdf : SummarySchema</br>
lastUpdated : date</br>

### ImageSchema:
objectID : objectId</br>
image : binData ([GridFS for Self-Managed Deployments - MongoDB Manual](https://www.mongodb.com/docs/manual/core/gridfs/) or single document if under 16 MB)</br>

### SummarySchema:
objectID : objectId</br>
pdf : binData ([GridFS for Self-Managed Deployments - MongoDB Manual](https://www.mongodb.com/docs/manual/core/gridfs/) or single document if under 16 MB)</br>
