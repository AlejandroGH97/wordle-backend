import json

addedWords = set()
documents = []
# word type description
with open('EDMTDictionary.json') as f:
	for line in f:
		words = json.loads(line)
		for w in words:
			if len(w['word']) == 5 and w['word'] not in addedWords and w['word'].isalpha():
				addedWords.add(w['word'])
				documents.append({"value": w['word'], "description": w['description'], "statistics": {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "fail": 0}})

with open('processed', 'w') as f:
	f.write(json.dumps(documents))

