import jaclang
from enum import Enum
from byllm import Model, by
llm = Model(model_name='gpt-4o-mini')

class Tell(Enum):
    YES = 'yes'
    NO = 'no'

@by(llm)
def yes_or_no(question: str) -> Tell:
    """Yes/No answering Bot"""

question: str = 'Are you an AI?'
answer: Tell = yes_or_no(question)
print(f'Question: {question}')
print('The bot answered ' + answer.value)