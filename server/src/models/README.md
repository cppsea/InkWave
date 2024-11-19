# UserSchema:
uuid : string
creationDate : date
deletionDate : date / null
lastUpdated : date
email : string (add email pattern)
password : string (hashed)

# NoteSchema:
objectID : objectId
userID : UserSchema
name : string
image : ImageSchema
pdf : SummarySchema
lastUpdated : date

# ImageSchema:
objectID : objectId
image : binData ([GridFS for Self-Managed Deployments - MongoDB Manual](https://www.mongodb.com/docs/manual/core/gridfs/) or single document if under 16 MB)

# SummarySchema:
objectID : objectId
pdf : binData ([GridFS for Self-Managed Deployments - MongoDB Manual](https://www.mongodb.com/docs/manual/core/gridfs/) or single document if under 16 MB)