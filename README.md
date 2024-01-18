Hey,

this is the repository for [wholesomegreentext.lol](wholesomegreentext.lol) an educational project I built to learn my way around causal language modeling with transformer models. 

The frontend is deployed from this repo using [Railway](railway.app). Model endpoints are deployed with [Huggingface](https://huggingface.co/).

It was my aim to train language models on consumer hardware to reproduce the idiosyncratic style of 4chan greentext (minus the hatespeech). Work is therefore mostly based on GPT-2 type models such as [TinyStories](https://arxiv.org/abs/2305.07759) and [DistilGPT-2](https://huggingface.co/distilgpt2). The ML training code lives mostly on Kaggle and in Google Colab. But I've put some of the notebooks into the `ml_stuff` folder for reference.

## Frontend

You can run the development server of the Next.JS project via

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
I use a [Supabase](https://supabase.com/) database. You'll have to set up your own. I use the following SQL tables to store generations and sessions.  

```sql
CREATE TYPE performance AS ENUM ('Yes', 'No', 'n/a');
CREATE TABLE greentexts (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    generation_id UUID NOT NULL,
    is_good performance DEFAULT 'n/a',
    model TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE sessions (
    session_id VARCHAR(255) PRIMARY KEY,
    session_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

## ML Stuff

### Real Data

I started out collecting real data using the Reddit pushshift dataset, particularly the screenshots posted on `/r/wholesomegreentexts`. Therefore, I collected all available greentexts, transcribed them using `Pytesseract` for optical character recognition and then put in some time for manual data curation.
This was done with a scrappy local service. You can start the backend of the QA app with `python app.py` and the frontend with `npm run dev` in the `flask_backend` and `frontend` folders inside the `QA App Folder`.

### Synthetic Data

I quickly realized that the dataset was simply not large enough, which is why I used OpenAI's inference endpoint for synthetic data generation. The respective Notebooks are in the `ml_stuff/data/synthetic` folder. I've created 3 separate datasets:

- 4chan style greentexts
- 4chan style greentexts using only simple words (a 3-4 year old can understand, in line with the prompt of the TinyStories dataset)
- 4chan style greentexts of the "thank you" genre

All datasets are on my [Huggingface profile](ttps://huggingface.co/maxmyn). There is also an [aggregate dataset](https://huggingface.co/datasets/maxmyn/wholesome_greentext_239k) that contains 239k examples.

Some datasets (prefixed with "simple") only contain the simple words present in the TinyStories dataset. I used the `extract_simple_greentexts` notebook to select the fitting generations out of the openAI generated data. 

In general I found tweaking the data (i.e. the included examples, dataset size, complexity of words etc.) to be the biggest lever in generation quality. 

### Training
Training was done on Kaggle and Google Colab. I found that the data was most effective in improving performance. The best performing model is the largest `TinyStories` one, fine-tuned with only data of the "thank you" genre using only simple words. Using more complex words (not contained in the corpus of the "TinyStories" foundation model dataset) degrades performance.Training only on a specific genre works better, even though the dataset containing different genres was 5x the size.
What also worked really well was to train a custom `<|4chanGtxStart|>` token sequence. It improved both, the `TinyStories` and GPT-2 perfomances. However, it proved very useful in the latter to disassociate the `>` token from code generation.

You can play around with the model performance yourself on [wholesomegreentext.lol](wholesomegreentext.lol).
