export const jacTabsData = [
  {
    filename: "distance_calculator.jac",
    code: `
import math;
import from random { uniform }

def calc_distance(x1: float, y1: float, x2: float, y2: float) -> float {
return math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

with entry { # main block
# Generate random points
(x1, y1) = (uniform(0, 10), uniform(0, 10));
(x2, y2) = (uniform(0, 10), uniform(0, 10));

    distance = calc_distance(x1, y1, x2, y2);
    area = math.pi * (distance / 2) ** 2;

    print("Distance:", round(distance, 2), ", Circle area:", round(area, 2));

}
`,
  },
  {
    filename: "ai_sentiment_analysis.jac",
    code: `
import from byllm { Model }

glob llm = Model(model_name="gpt-4o");

# Define MemoryDetails including descriptions using sem keyword
sem MemoryDetails = "Extracted details from a photo and context";
sem MemoryDetails.who = "Names of people in the photo";  
sem MemoryDetails.what = "What is happening in the scene";
sem MemoryDetails.where = "Location or setting of the photo";
sem MemoryDetails.when = "Date in YYYY-MM-DD format";
sem MemoryDetails.summary = "Brief description of the memory";

# Define a function that extracts \`memory_details\` using the LLM
def extract_memory_details(
    image: Image, 
    city: str, 
    people: List[str]
) -> MemoryDetails by llm();
`,
  },
  {
    filename: "agent_system.jac",
    code: `
import from byllm.llm {Model}

glob llm = Model(model_name="gemini/gemini-2.5-flash");

node Equipment {}
node Weights(Equipment) {
    has available: bool = False;
    can check with FitnessAgent entry {
        visitor.gear["weights"] = self.available;
    }
}
node Cardio(Equipment) {
    has machine: str = "treadmill";
    can check with FitnessAgent entry {
        visitor.gear["cardio"] = self.machine;
    }
}
node Trainer {
    can plan with FitnessAgent entry {
        visitor.gear["workout"] = visitor.create_workout(visitor.gear);
    }
}
walker FitnessAgent {
    has gear: dict = {};
    can start with \`root entry {
        visit [-->(\`?Equipment)];
    }
    def create_workout(gear: dict) -> str by llm();
}
walker CoachWalker(FitnessAgent) {
    can get_plan with \`root entry {
        visit [-->(\`?Trainer)];
    }
}
with entry {
    root ++> Weights();
    root ++> Cardio();
    root ++> Trainer();
    agent = CoachWalker() spawn root;
    print("Your Workout Plan:");
    print(agent.gear['workout']);
}
`,
  },
  {
    filename: "oop_example.jac",
    code: `
# Nodes represent entities or objects in the system, holding attributes and behaviors.  
# Edges define relationships or connections between nodes, allowing traversal or interaction.  
# Walkers are agents that navigate nodes via edges, performing actions and gathering or modifying data.

import from random {randint}

node Landmark {
    has name: str;
    can react with Tourist entry {
        print("📸 Tourist visits", self.name);
        visit [-->];
    }
}

node Cafe {
    can react with Tourist entry {
        if randint(0,1) == 0 {
            print("☕ Tourist gets coffee and continues exploring.");
            visit [-->];
        } else {
            print("😴 Tourist got too cozy at Cafe and ended the trip.");
            disengage;
        }
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
        print("🚶 Tourist begins the journey at", here);
        visit [-->];
    }

    can log_visit with Landmark exit {
        self.visited.append(here.name);
    }

    can end_trip with exit {
        print("🏁 Tourist trip ended. Places seen:", self.visited);
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
        # Pure business logic, zero boilerplate
    }
}
`,
  },
];

export const pythonTabsData = [
  {
    filename: "distance_calculator.py",
    code: `
import math
import random

def calc_distance(x1: float, y1: float, x2: float, y2: float) -> float:
    return math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

# Generate random points
x1, y1 = random.uniform(0, 10), random.uniform(0, 10)
x2, y2 = random.uniform(0, 10), random.uniform(0, 10)

distance = calc_distance(x1, y1, x2, y2)
area = math.pi * (distance / 2) ** 2

print("Distance:", round(distance, 2), ", Circle area:", round(area, 2))
`,
  },
  {
    filename: "ai_sentiment_analysis.py",
    code: `
import json
from datetime import datetime

def extract_memory_details(image_data, city, people):

    tools = [
        {
            "type": "function",
            "function": {
                "name": "process_memory",
                "description": "Process and validate a memory with its details from the user utterance",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "response": {
                            "type": "string",
                            "description": "A response to the user, including a question to continue the conversation"
                        },
                        "summary": {"type": "string"},
                        "what": {"type": "string"},
                        "when": {
                            "type": "string",
                            "description": (
                                f"Capture the when in  \`yy-mm-dd\`,   \`yy-mm\`, or \`yy\` format. "
                                f"If provided with relative times, use today's date {datetime.today().strftime('%Y-%m-%d')} as a reference point to figure out the exact or approximate time."
                            )
                        },
                        "where": {
                            "type": "array",
                            "items": {"type": "string"}
                        },
                        "who": {
                            "type": "array",
                            "items": {"type": "string"}
                        },
                        "save_memory": {
                            "type": "boolean"
                        },
                        "show_summary": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "response", "summary", "what", "when", "where",
                        "who", "save_memory", "show_summary"
                    ]
                }
            }
        }
    ]

    # ... (rest of the python code)
    # This is a simplified representation. The full code is very long.
    # In a real app, you would make an API call to a service like OpenAI.
    
    print("Complex prompt engineering and API calls would happen here.")
    return {
        "summary": "This is a memory summary.",
        "response": "What else do you remember?"
    }
`,
  },
  {
    filename: "agent_system.py",
    code: `
class Equipment:
    pass

class Weights(Equipment):
    def __init__(self):
        self.available = False

class Cardio(Equipment):
    def __init__(self):
        self.machine = "treadmill"

class Trainer:
    def plan(self, gear):
        return "Workout plan based on available equipment."

class FitnessAgent:
    def __init__(self):
        self.gear = {}

    def start(self, equipment_list):
        for eq in equipment_list:
            if isinstance(eq, Weights):
                self.gear["weights"] = eq.available
            elif isinstance(eq, Cardio):
                self.gear["cardio"] = eq.machine

    def create_workout(self, gear):
        # In a real scenario, this would call an LLM
        return "Personalized workout plan based on reasoning."

weights = Weights()
cardio = Cardio()
trainer = Trainer()
agent = FitnessAgent()
agent.start([weights, cardio])
agent.gear["workout"] = agent.create_workout(agent.gear)
print("Your Workout Plan:")
print(agent.gear["workout"])
`,
  },
  {
    filename: "oop_example.py",
    code: `
import random

class Landmark:
    def __init__(self, name):
        self.name = name

    def react(self, tourist):
        print("📸 Tourist visits", self.name)
        tourist.visited.append(self.name)


class Cafe:
    def react(self, tourist):
        if random.randint(0, 1) == 0:
            print("☕ Tourist gets coffee and continues exploring.")
        else:
            print("😴 Tourist got too cozy at Cafe and ended the trip.")
            tourist.active = False


class Local:
    def react(self, tourist):
        print("👋 Local greets the Tourist")


class Tourist:
    def __init__(self):
        self.visited = []
        self.active = True

    def start_trip(self, places):
        print("🚶 Tourist begins the journey")
        for place in places:
            if not self.active:
                break
            place.react(self)
        print("🏁 Tourist trip ended. Places seen:", self.visited)


# --- Build the "world" ---
places = [
    Local(),
    Landmark("Eiffel Tower"),
    Cafe(),
    Landmark("Colosseum")
]

# --- Run simulation ---
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
    title: "Jac Supersets Python",
    summary:
      "Jac is a drop-in replacement and superset of Python, like TypeScript for JavaScript, offering full Python interoperability while adding features to simplify and accelerate AI application development.",
    link: "https://www.jac-lang.org/jac_book/chapter_1/#comparison-with-python-and-traditional-languages",
  },
  {
    title: "Programming Abstractions for Al",
    summary:
      "Jac introduces programming abstractions designed for AI, making it easy to integrate LLMs and multimodal models directly into your code with minimal effort.",
    link: "https://www.jac-lang.org/learn/jac-byllm/with_llm/",
  },
  {
    title: "An Agentic Programming Model",
    summary:
      "Jac enables an agentic programming model, allowing you to build complex, multi-agent systems with simple, readable code.",
    link: "https://www.jac-lang.org/learn/introduction/#beyond-oop-an-agentic-programming-model",
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
