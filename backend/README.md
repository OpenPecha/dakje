# Dakje Backend

## Endpoints

### Segmenting the text
endpoint-name: `/segment`
method: `POST`

input:
```json
{
  "content": "dakje content"
}
```

output:
```json
{
  "tokens": [
    {
      "form": "dakje",
      "pos": "NOUN"
    },
    ...
  ]
}
```

### Analyse Sentence
endpoint-name: `/analyse-sentence`
method: `POST`

input:
```json
{
  "content": "dakje content"
}
```

output:
```json
{
  "sentences": [
    {
      "sentence_length": 10,
      "verb_per_sentence": 2
    },
    ...
  ]
}
```
