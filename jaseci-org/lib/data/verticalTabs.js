export const jacTabsData = [
    {
        filename: "ai_sentiment_analysis.jac",
        code: `
import from byllm { Model, Image }

glob llm = Model(model_name="gpt-4o");

obj MemoryDetails {
    has who: list[str];
    has what: str;
    has where: str;
}
sem MemoryDetails = "Extract people, event, place, and time from a photo";

def extract_memory_details(
    image: Image, city: str
) -> MemoryDetails by llm();

with entry {
    img = Image("image.png");
    details = extract_memory_details(img, "Paris");
    print(details);
}`,
    },
    {
        filename: "oop_example.jac",
        code: `
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
        visit [-->];
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
# The code you write is a simple, logical workflow. When deployed on Jac Cloud
# via \`jac serve\`, this same code can handle one request or millions of requests
# without any changes, as the platform manages state and scaling automatically.

import from mtllm.llm  { Model, Image }
import from typing { List }

glob llm = Model(model_name="gpt-4.1");

obj Response {
    has follow_up_questions: str;
    has summary: str;
    has when: str;
    has who: List[str];
    has what: str;
    has location_type: str;
}

def extract_memory_details(
    image: Image, 
    city: str = "",
    date: str = "",
    people: List[str] = []
) -> Response by llm();

walker create_memory {
    has memory_data: dict;
    
    can process_memory with memory entry {
        memory_details = extract_memory_details(self.memory_data.image, 
                                               self.memory_data.city, 
                                               self.memory_data.people);
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
from openai import OpenAI

client = OpenAI()

tools = [{
    "type": "function",
    "function": {
        "name": "process_memory",
        "parameters": {
            "type": "object",
            "properties": {
                "who": {"type": "array", "items": {"type": "string"}},
                "what": {"type": "string"},
                "where": {"type": "string"}
            },
            "required": ["who", "what", "where"]
        }
    }
}]

SYS_PROMPT = "Extract people, event, place, and time from the photo."

with open("image.png", "rb") as f:
    image_b64 = base64.b64encode(f.read()).decode("utf-8")

messages = [
    {"role": "system", "content": SYS_PROMPT},
    {
        "role": "user",
        "content": [
            {"type": "text", "text": "Photo took in Paris."},
            {"type": "image_url", "image_url": {
                "url": f"data:image/png;base64,{image_b64}"
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
# This code is a conceptual representation.
# A real implementation would involve FastAPI, SQLAlchemy, and other libraries.

from fastapi import FastAPI, Depends, Request

app = FastAPI()

# Database and authentication boilerplate
def get_current_user():
    # Logic to get user from token
    return {"username": "testuser"}

@app.post("/memories/")
async def create_memory(memory_data: dict, current_user: dict = Depends(get_current_user)):
    # AI integration logic would go here
    # e.g., process_with_ai(memory_data['image'], ...)
    
    # Business logic mixed with boilerplate
    print("Saving memory to database...")
    return {"status": "success", "memory_id": "123"}

print("Run this with: uvicorn main:app --reload")
`,
    },
];

export const tabsData = [
    {
        title: "Programming Abstractions for Al",
        summary:
            "Jac introduces programming abstractions designed for AI, making it easy to integrate LLMs and multimodal models directly into your code with minimal effort.",
        link: "https://www.jac-lang.org/learn/jac-byllm/with_llm/",
    },
    {
        title: "Object-spatial programming",
        summary:
            "Object-spatial programming in Jac lets you model, traverse, and manipulate rich object graphs, making it ideal for knowledge graphs, games, and more.",
        link: "https://www.jac-lang.org/jac_book/chapter_8/",
    },
    {
        title: "Zero to Infinite Scale without Code Changes",
        summary:
            "Jac enables zero to infinite scale without code changes. Deploy your Jac apps from local to cloud with built-in scaling, persistence, and user management.",
        link: "https://www.jac-lang.org/learn/jac-cloud/introduction/",
    },
];
