export const jacTabsData = [
    {
        filename: "ai_sentiment_analysis.jac",
        code: `
import from byllm { Model, Image }

glob llm = Model(model_name="gpt-4o");

# One tiny object replaces a giant schem
obj MemoryDetails {
    has who: list[str];
    has what: str;
    has where: str;
}
sem MemoryDetails = "Extract people, event, place from the photo";

def extract_memory_details(
    image: Image, city: str
) -> MemoryDetails by llm(); # Magic happens

with entry {
    img = Image("image.png");
    details = extract_memory_details(img, "Paris");
    print(details);
}`,
    },
    {
        filename: "oop_example.jac",
        code: `
# --- Build a living, interconnected world with nodes and walkers ---

node Landmark {
    has name: str;
    can react with Tourist entry {
        print("📸 Tourist visits", self.name);
        visit [-->];
    }
}

node Cafe {
    can react with Tourist entry {
        print("☕ Tourist gets coffee and continues exploring.");
        visit [-->]; # flows to connected nodes
    }
}

node Local {
    can react with Tourist entry {
        print("👋 Local greets the Tourist");
    }
}

walker Tourist {
    has visited: list = [];

    can start_trip with \`root entry {
        print("🚶 Begins the journey at", here);
        visit [-->];
    }
    can log_visit with Landmark exit {
        self.visited.append(here.name);
    }
    can end_trip with exit {
        print("🏁 Trip ended. Places seen:", self.visited);
    }
}

with entry {
    # Build world
    root ++> Local();
    root ++> Landmark(name="Eiffel Tower");
    root ++> Cafe();
    root ++> Landmark(name="Colosseum");

    # Send Tourist walking
    a = (root spawn Tourist());
    print("Tourist entity ID:", a.visited);
}
`,
    },
    {
        filename: "cloud_scaling.jac",
        code: `
# nodes + walkers + jac-cloud --> auto-endpoint magic
# Auth & database handled behind the scenes

node Memory {
    has memories: list[str] = [];

    can add_memory with add_memory entry {
        # Simple append, no DB worries
        self.memories.append(visitor.memory);
        report {
            "message": f"Memory added: {visitor.memory}"
        };
    }
    can list_memories with get_memories entry {
        report { "memories": self.memories };
    }
}

# Endpoint ready!, thanks to the walker abstraction
walker add_memory {
    has memory: str;

    can add_memory with \`root entry {
        visit [--> (\`?Memory)] else {
            visit root ++> Memory();
        }
    }
}

walker get_memories {
    can list_memories with \`root entry {
        visit [--> (\`?Memory)] else {
            report { "memories": [] };
        }
    }
}
`,
    },
];

export const pythonTabsData = [
    {
        filename: "ai_sentiment_analysis.py",
        code: `
import json, base64
from datetime import datetime
from openai import OpenAI

client = OpenAI()

# --- Lots of boilerplate just to define a schema ---
tools = [{
    "type": "function",
    "function": {
        "name": "process_memory",
        "description": 
            "Extract structured memory details from the photo",
        "parameters": {
            "type": "object",
            "properties": {
                "who": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "Names of people in the photo"
                },
                "what": {
                    "type": "string",
                    "description": "What is happening in the scene"
                },
                "where": {
                    "type": "string",
                    "description": 
                        "Location or setting of the photo"
                }
            },
            "required": ["who", "what", "where"]
        }
    }
}]

# --- The prompt has to sit here like a Novel ---
SYS_PROMPT = """
# Role and Objective
Your goal is to extract structured memory details from
referenced images and user context. Engage in a way that feels 
natural, as if you were helping someone document their 
experiences, but always return structured output.

# Instructions
- Extract details only based on the image and user input.
- Avoid hallucinations or assumptions if information is missing.
- Always call the \`process_memory\` tool to return results.
- Keep results short, factual, and consistent.

# Sub-categories for more detailed instructions
## First Turn
- React to the image or context briefly.
- Encourage clarification if information is incomplete.

## Field Writing (for process_memory)
- **who**: list of people, animals, or notable entities.
- **what**: concise description of the activity or event 
  (3-5 words).
- **where**: specific place, city, or landmark provided 
   or visible.

### Reasoning Steps
- If the user corrects existing information, update the fields.
- If new information is provided, add it without discarding 
  existing relevant details.
- If a field is not mentioned or visible, leave it empty.

## Response Writing
- Keep responses factual and grounded in what's visible or given.
- Never ask the user irrelevant questions.
- Use the photo context to refine details when applicable.

# Output Format
Always return JSON via the \`process_memory\` tool with:
- \`who\`: list of strings
- \`what\`: string (short activity/event description)
- \`where\`: string (location or place)
"""

with open("image.png", "rb") as f:
    image_b64 = base64.b64encode(f.read()).decode("utf-8")

# --- Verbose message construction ---
messages = [
    {"role": "system", "content": SYS_PROMPT},
    {
        "role": "user",
        "content": [
            {"type": "text", "text": "Photo took in Paris."},
            {"type": "image_url", "image_url": {
                "url": f"data:image/png;base64,{image_b64}"}
            }
        ]
    }
]

response = client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
    tools=tools,
    tool_choice={
        "type": "function", 
        "function": {"name": "process_memory"}
    }
)

result = json.loads(
    response.choices[0].message.tool_calls[0].function.arguments
)

print(result)
`,
    },
    {
        filename: "oop_example.py",
        code: `
class Landmark:
    def __init__(self, name):
        self.name = name
    
    def react(self, tourist):
        print("📸 Tourist visits", self.name)
        tourist.visited.append(self.name)

class Cafe:
    def react(self, tourist):
        print("☕ Tourist gets coffee and continues exploring.")

class Local:
    def react(self, tourist):
        print("👋 Local greets the Tourist")

class Tourist:
    def __init__(self):
        self.visited = []

    def start_trip(self, places):
        print("🚶 Begins the journey")
        for place in places:
            place.react(self)
        print("🏁 Trip ended. Places seen:", self.visited)

# Build world
places = [
    Local(),
    Landmark("Eiffel Tower"),
    Cafe(),
    Landmark("Colosseum")
]

# Send Tourist walking
tourist = Tourist()
tourist.start_trip(places)
`,
    },
    {
        filename: "cloud_scaling.py",
        code: `
from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from datetime import datetime, timedelta
import jwt, pymongo, hashlib

# --- App & Security Setup ---
app = FastAPI()
SECRET_KEY = "secret123"
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# --- MongoDB Setup ---
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["mydb"]
users_collection = db["users"]
memories_collection = db["memories"]

# --- Models ---
class User(BaseModel):
    username: str
    password: str

class MemoryItem(BaseModel):
    memory: str

# --- Auth Helpers ---
def create_token(username: str):
    """Generate JWT token for a user."""
    payload = {
        "sub": username,
        "exp": datetime.utcnow() + timedelta(hours=1)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(token: str = Depends(oauth2_scheme)):
    """Decode and validate JWT token."""
    try:
        payload = jwt.decode(
            token, SECRET_KEY, algorithms=[ALGORITHM]
        )
        return payload["sub"]
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=401, detail="Token expired"
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=401, detail="Invalid token"
        )

# --- Routes ---
@app.post("/signup")
def signup(user: User):
    """Register a new user with hashed password."""
    hashed_pw = hashlib.sha256(user.password.encode()).hexdigest()

    if users_collection.find_one({"username": user.username}):
        raise HTTPException(
            status_code=400, detail="User already exists"
        )

    users_collection.insert_one({
        "username": user.username, 
        "password": hashed_pw
    })
    return {"message": "User created successfully"}

@app.post("/login")
def login(user: User):
    """Authenticate user and return JWT token."""
    hashed_pw = hashlib.sha256(user.password.encode()).hexdigest()
    db_user = users_collection.find_one({
        "username": user.username, 
        "password": hashed_pw
    })

    if not db_user:
        raise HTTPException(
            status_code=400, 
            detail="Invalid username or password"
        )
    access_token = create_token(user.username)
    return {"access_token": access_token, "token_type": "bearer"}


# --- the long road to a simple task --- 
@app.post("/add_memory")
def add_memory(
    item: MemoryItem,
    current_user: str = Depends(verify_token)
):
    """Add a memory for the current user."""
    memories_collection.insert_one({
        "username": current_user,
        "memory": item.memory,
        "timestamp": datetime.utcnow()
    })
    return {"message": f"Memory added: {item.memory}"}


@app.get("/get_memories")
def get_user_memories(current_user: str = Depends(verify_token)):
    """Retrieve all memories for the current user."""
    user_memories = list(memories_collection.find(
        {"username": current_user},
        {"_id": 0, "memory": 1, "timestamp": 1}
    ))
    return {"memories": user_memories}
`},
];

export const tabsData = [
    {
        title: "Programming Abstractions for Al",
        summary:
            "Jac introduces programming abstractions designed for AI, making it easy to integrate LLMs and multimodal models directly into your code with minimal effort.",
        link: "https://www.jac-lang.org/learn/jac-byllm/with_llm/",
        diagram: {
            src: "/diagrams/image.png",
            fallback: "/diagrams/ai-abstractions-static.png",
            title: "AI Programming Abstractions Flow",
            description: "Visual representation of how AI models integrate seamlessly into Jac code",
            type: "animated"
        }
    },
    {
        title: "Object-spatial programming",
        summary:
            "Object-spatial programming in Jac lets you model, traverse, and manipulate rich object graphs, making it ideal for knowledge graphs, games, and more.",
        link: "https://www.jac-lang.org/jac_book/chapter_8/",
        diagram: {
            src: "/diagrams/object-spatial-diagram.gif",
            fallback: "/diagrams/object-spatial-static.png",
            title: "Object-Spatial Programming Flow",
            description: "Visual representation of nodes, walkers, and spatial relationships",
            type: "animated"
        }
    },
    {
        title: "Zero to Infinite Scale without Code Changes",
        summary:
            "Jac enables zero to infinite scale without code changes. Deploy your Jac apps from local to cloud with built-in scaling, persistence, and user management.",
        link: "https://www.jac-lang.org/learn/jac-cloud/introduction/",
        diagram: {
            src: "/diagrams/scaling-architecture.gif",
            fallback: "/diagrams/scaling-architecture-static.png",
            title: "Zero to Infinite Scale Architecture",
            description: "How Jac applications seamlessly scale from local to distributed systems",
            type: "animated"
        }
    },
];
