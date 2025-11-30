// main.go

package main

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	jwtware "github.com/gofiber/jwt/v3"
	"github.com/golang-jwt/jwt/v4"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt"
)

// Struct Definitions

type Room struct {
	Ref                string  `json:"ref" bson:"ref"`
	RoomName           string  `json:"roomName" bson:"roomname"`
	Width              int     `json:"width" bson:"width"`
	Height             int     `json:"height" bson:"height"`
	Putty              bool    `json:"putty" bson:"putty"`
	Mastic             bool    `json:"mastic" bson:"mastic"`
	Paint              bool    `json:"paint" bson:"paint"`
	Tenon              bool    `json:"tenon" bson:"tenon"`
	EC                 bool    `json:"eC" bson:"eC"`
	Encapsulation      int     `json:"encapsulation" bson:"encapsulation"`
	BottomRail         bool    `json:"bottomRail" bson:"bottomRail"`
	Dormer             bool    `json:"dormer" bson:"dormer"`
	PullyWheel         bool    `json:"pullyWheel" bson:"pullyWheel"`
	PanesNumber        int     `json:"panesNumber" bson:"panesNumber"`
	StainRepairs       int     `json:"stainRepairs" bson:"stainRepairs"`
	Cill               string  `json:"cill" bson:"cill"`
	Sash               string  `json:"sash" bson:"sash"`
	Notes              string  `json:"notes" bson:"notes"`
	Formation          string  `json:"formation" bson:"formation"`
	CustomFormation    string  `json:"customFormation" bson:"customFormation"`
	Count              int     `json:"count" bson:"count"`
	GlassType          string  `json:"glassType" bson:"glassType"`
	GlassTypeTopBottom string  `json:"glassTypeTopBottom" bson:"glassTypeTopBottom"`
	Casement           bool    `json:"casement" bson:"casement"`
	PriceChange        float64 `json:"priceChange" bson:"priceChange"`
	PriceChange2       string  `json:"priceChange2" bson:"priceChange2"`
	PositiveNegative   string  `json:"positiveNegative" bson:"positiveNegative"`
	PriceChangeNotes   string  `json:"priceChangeNotes" bson:"priceChangeNotes"`
	EasyClean          bool    `json:"easyClean" bson:"easyClean"`
	MasticPatch        bool    `json:"masticPatch" bson:"masticPatch"`
	OutsidePatch       bool    `json:"outsidePatch" bson:"outsidePatch"`
	ConcealedVent      bool    `json:"concealedVent" bson:"concealedVent"`
	TrickleVent        bool    `json:"trickleVent" bson:"trickleVent"`
	Handles            bool    `json:"handles" bson:"handles"`
	Shutters           bool    `json:"shutters" bson:"shutters"`
	CustomItem         bool    `json:"customItem" bson:"customItem"`
	CustomItemText     string  `json:"customItemText" bson:"customItemText"`
	CustomItem2        int     `json:"customItem2" bson:"customItem2"`
	QuoteNotes         string  `json:"quoteNotes" bson:"quoteNotes"`
	WindowNotes        string  `json:"windowNotes" bson:"windowNotes"`
	CenterMullion      int     `json:"centerMullion" bson:"centerMullion"`
	SashRestrictor     bool    `json:"sashRestrictor" bson:"sashRestrictor"`
}

type Job struct {
	ID                 primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	QuoteID            string             `json:"quoteId" bson:"quoteId"`
	Completed          bool               `json:"completed" bson:"completed"`
	Date               string             `json:"date" bson:"date"`
	CustomerName       string             `json:"customerName" bson:"customername"`
	Address            string             `json:"address" bson:"address"`
	Email              string             `json:"email" bson:"email"`
	Phone              string             `json:"phone" bson:"phone"`
	PostCode           string             `json:"postCode" bson:"postcode"`
	Rooms              []Room             `json:"rooms" bson:"rooms"`
	Options            []string           `json:"options" bson:"options"`
	PlanningPermission string             `json:"planningPermission" bson:"planningPermission"`
	SiteNotes          string             `json:"siteNotes" bson:"siteNotes"`
	AddressLineOne     string             `json:"addressLineOne" bson:"addressLineOne"`
	AddressLineTwo     string             `json:"addressLineTwo" bson:"addressLineTwo"`
	AddressLineThree   string             `json:"addressLineThree" bson:"addressLineThree"`
}

type User struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Username string             `json:"username" bson:"username"`
	Email    string             `json:"email" bson:"email"`
	Password string             `json:"password" bson:"password"`
}

type Counter struct {
	ID  string `bson:"_id"`
	Seq int    `bson:"seq"`
}

type Temp struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name     string             `json:"name" bson:"name"`
	Image    []byte             `json:"image" bson:"image"`
	FileType string             `json:"fileType" bson:"fileType"`
}

// Global Variables

var (
	jobCollection      *mongo.Collection
	userCollection     *mongo.Collection
	countersCollection *mongo.Collection
	tempsCollection    *mongo.Collection
	drawingCollection  *mongo.Collection
	jwtSecret          string
	tokenExpiryTime    = time.Hour * 1000000
)

// JWT Claims Structure

type Claims struct {
	Email string `json:"email"`
	jwt.RegisteredClaims
}

// Main Function

func main() {
	_ = godotenv.Load()
	MONGODB_URI := os.Getenv("MONGODB_URI")
	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "5000"
	}
	jwtSecret = os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		log.Fatal("JWT_SECRET not set")
	}

	allowOrigins := os.Getenv("ALLOW_ORIGINS")
	if allowOrigins == "" {
		allowOrigins = "http://localhost:5173"
	}

	clientOptions := options.Client().ApplyURI(MONGODB_URI)

	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal("MongoDB connection error: ", err)
	}
	defer func() {
		if err = client.Disconnect(context.Background()); err != nil {
			log.Fatal("MongoDB disconnection error: ", err)
		}
	}()

	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal("MongoDB ping error: ", err)
	}
	fmt.Println("Connected to MongoDB!")

	jobCollection = client.Database("quote_db").Collection("jobs")
	userCollection = client.Database("quote_db").Collection("users")
	countersCollection = client.Database("quote_db").Collection("counters")
	tempsCollection = client.Database("quote_db").Collection("temps")
	drawingCollection = client.Database("quote_db").Collection("drawings")

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     allowOrigins,
		AllowMethods:     "GET, POST, PUT, DELETE, PATCH",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowCredentials: true,
	}))

	app.Static("/", "./client/dist")
	app.Post("/api/register", registerUser)
	app.Post("/api/login", loginUser)

	app.Use(jwtware.New(jwtware.Config{
		SigningKey:   []byte(jwtSecret),
		ErrorHandler: jwtError,
		Filter: func(c *fiber.Ctx) bool {
			path := c.Path()
			if !strings.HasPrefix(path, "/api") {
				return true
			}

			if path == "/api/login" || path == "/api/register" {
				return true
			}

			return false
		},
	}))

	app.Get("/api/jobs", getJobs)
	app.Get("/api/jobs/:id", getJob)
	app.Post("/api/jobs", createJob)
	app.Put("/api/jobs/:id", updateJob)
	app.Delete("/api/jobs/:id", deleteJob)
	app.Post("/api/temps", uploadTempImage)
	app.Get("/api/temps/image/:name", getTempImage)

	app.Post("/api/jobs/:id/convert-to-drawing", convertJobToDrawing)
	app.Get("/api/drawings", getDrawings)
	app.Get("/api/drawings/:id", getDrawing)
	app.Put("/api/drawings/:id", updateDrawing)
	app.Delete("/api/drawings/:id", deleteDrawing)

	app.Use(func(c *fiber.Ctx) error {
		if c.Path() == "/api" || strings.HasPrefix(c.Path(), "/api/") {
			return c.Next()
		}
		return c.SendFile("./client/dist/index.html")
	})

	log.Fatal(app.Listen("0.0.0.0:" + PORT))
}

// Handler Functions

func getNextSequenceNumber(name string) (int, error) {
	filter := bson.M{"_id": name}
	update := bson.M{"$inc": bson.M{"seq": 1}}
	opts := options.FindOneAndUpdate().SetUpsert(true).SetReturnDocument(options.After)

	var counter Counter
	err := countersCollection.FindOneAndUpdate(context.Background(), filter, update, opts).Decode(&counter)
	if err != nil {
		return 0, err
	}

	return counter.Seq, nil
}

func registerUser(c *fiber.Ctx) error {
	type Request struct {
		Username string `json:"username"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	var req Request
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse JSON",
		})
	}

	if req.Username == "" || req.Email == "" || req.Password == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "All fields are required",
		})
	}

	count, err := userCollection.CountDocuments(context.Background(), bson.M{
		"email": req.Email,
	})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Database error",
		})
	}
	if count > 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "User already exists",
		})
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error hashing password",
		})
	}

	user := User{
		Username: req.Username,
		Email:    req.Email,
		Password: string(hashedPassword),
	}

	result, err := userCollection.InsertOne(context.Background(), user)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Error creating user",
		})
	}

	user.ID = result.InsertedID.(primitive.ObjectID)
	user.Password = ""

	return c.Status(fiber.StatusCreated).JSON(user)
}

func loginUser(c *fiber.Ctx) error {
	type Request struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	var req Request
	if err := c.BodyParser(&req); err != nil {
		log.Println("BodyParser Error:", err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse JSON",
		})
	}

	if req.Email == "" || req.Password == "" {
		log.Println("Validation Error: Missing fields")
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "All fields are required",
		})
	}

	var user User
	err := userCollection.FindOne(context.Background(), bson.M{
		"email": req.Email,
	}).Decode(&user)
	if err != nil {
		log.Println("FindOne Error:", err)
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Invalid credentials",
		})
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password))
	if err != nil {
		log.Println("Password Compare Error:", err)
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Invalid credentials",
		})
	}

	expirationTime := time.Now().Add(tokenExpiryTime)
	claims := &Claims{
		Email: user.Email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Issuer:    "preservation-windows",
			Subject:   user.ID.Hex(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	t, err := token.SignedString([]byte(jwtSecret))
	if err != nil {
		log.Println("JWT Generation Error:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to generate token",
		})
	}

	return c.JSON(fiber.Map{
		"token": t,
	})
}

func jwtError(c *fiber.Ctx, err error) error {
	if err.Error() == "Missing or malformed JWT" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Missing or malformed JWT",
		})
	}
	return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
		"error": "Invalid or expired JWT",
	})
}

func getJobs(c *fiber.Ctx) error {
	var jobs []Job
	cursor, err := jobCollection.Find(context.Background(), bson.M{})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Database error",
		})
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var job Job
		if err := cursor.Decode(&job); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Error decoding job data",
			})
		}
		jobs = append(jobs, job)
	}

	return c.JSON(jobs)
}

func getJob(c *fiber.Ctx) error {
	id := c.Params("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid ID",
		})
	}

	filter := bson.M{"_id": objID}
	var job Job
	err = jobCollection.FindOne(context.Background(), filter).Decode(&job)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Could not find job",
		})
	}

	return c.JSON(job)
}

func createJob(c *fiber.Ctx) error {
	collection := jobCollection

	var job Job

	if err := c.BodyParser(&job); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	seq, err := getNextSequenceNumber("quoteId")
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to generate quote ID",
		})
	}

	job.QuoteID = strconv.Itoa(seq)

	result, err := collection.InsertOne(c.Context(), job)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	job.ID = result.InsertedID.(primitive.ObjectID)

	return c.Status(fiber.StatusCreated).JSON(job)
}

func updateJob(c *fiber.Ctx) error {
	id := c.Params("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid ID",
		})
	}

	job := new(Job)
	if err := c.BodyParser(job); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid JSON",
		})
	}

	filter := bson.M{"_id": objID}
	update := bson.M{"$set": job}

	_, err = jobCollection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Could not update job",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Job updated"})
}

func deleteJob(c *fiber.Ctx) error {
	id := c.Params("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid ID",
		})
	}

	filter := bson.M{"_id": objID}
	result, err := jobCollection.DeleteOne(context.Background(), filter)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Could not delete job",
		})
	}

	if result.DeletedCount == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Job not found",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Job deleted"})
}

func uploadTempImage(c *fiber.Ctx) error {
	name := c.FormValue("name")
	if name == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Name is required",
		})
	}

	fileHeader, err := c.FormFile("image")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Image file is required",
		})
	}

	file, err := fileHeader.Open()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to open uploaded file",
		})
	}
	defer file.Close()

	imageData, err := ioutil.ReadAll(file)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to read file content",
		})
	}

	temp := Temp{
		Name:     name,
		Image:    imageData,
		FileType: fileHeader.Header.Get("Content-Type"),
	}

	result, err := tempsCollection.InsertOne(context.Background(), temp)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to save image",
		})
	}

	temp.ID = result.InsertedID.(primitive.ObjectID)

	return c.Status(fiber.StatusCreated).JSON(temp)
}

func getTempImage(c *fiber.Ctx) error {
	name := c.Params("name")
	if name == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Name is required",
		})
	}

	var temp Temp
	err := tempsCollection.FindOne(context.Background(), bson.M{"name": name}).Decode(&temp)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Image not found",
		})
	}

	c.Set("Content-Type", temp.FileType)
	return c.Send(temp.Image)
}


// Drawing and invoice helpers:
// Convert an existing job into a drawing entry
func convertJobToDrawing(c *fiber.Ctx) error {
    id := c.Params("id")
    objID, err := primitive.ObjectIDFromHex(id)
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "Invalid job ID",
        })
    }

    // Find the job
    var job Job
    err = jobCollection.FindOne(context.Background(), bson.M{"_id": objID}).Decode(&job)
    if err != nil {
        return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
            "error": "Job not found",
        })
    }

    // Reset ID so MongoDB assigns a new one in the drawings collection
    job.ID = primitive.NilObjectID

    // Insert into drawings collection
    result, err := drawingCollection.InsertOne(context.Background(), job)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": "Failed to create drawing",
        })
    }

    job.ID = result.InsertedID.(primitive.ObjectID)

    // Return the drawing document (same shape as Job)
    return c.Status(fiber.StatusCreated).JSON(job)
}

func getDrawings(c *fiber.Ctx) error {
    var drawings []Job
    cursor, err := drawingCollection.Find(context.Background(), bson.M{})
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": "Database error",
        })
    }
    defer cursor.Close(context.Background())

    for cursor.Next(context.Background()) {
        var drawing Job
        if err := cursor.Decode(&drawing); err != nil {
            return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
                "error": "Error decoding drawing data",
            })
        }
        drawings = append(drawings, drawing)
    }

    return c.JSON(drawings)
}

func getDrawing(c *fiber.Ctx) error {
    id := c.Params("id")
    objID, err := primitive.ObjectIDFromHex(id)
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "Invalid ID",
        })
    }

    var drawing Job
    err = drawingCollection.FindOne(context.Background(), bson.M{"_id": objID}).Decode(&drawing)
    if err != nil {
        return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
            "error": "Drawing not found",
        })
    }

    return c.JSON(drawing)
}

func updateDrawing(c *fiber.Ctx) error {
    id := c.Params("id")
    objID, err := primitive.ObjectIDFromHex(id)
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "Invalid ID",
        })
    }

    drawing := new(Job)
    if err := c.BodyParser(drawing); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "Invalid JSON",
        })
    }

    filter := bson.M{"_id": objID}
    update := bson.M{"$set": drawing}

    _, err = drawingCollection.UpdateOne(context.Background(), filter, update)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": "Could not update drawing",
        })
    }

    return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Drawing updated"})
}

func deleteDrawing(c *fiber.Ctx) error {
    id := c.Params("id")
    objID, err := primitive.ObjectIDFromHex(id)
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "Invalid ID",
        })
    }

    filter := bson.M{"_id": objID}
    result, err := drawingCollection.DeleteOne(context.Background(), filter)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": "Could not delete drawing",
        })
    }

    if result.DeletedCount == 0 {
        return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
            "error": "Drawing not found",
        })
    }

    return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Drawing deleted"})
}
