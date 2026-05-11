# 🎬 BookMyShow Scraper

A simple scraper for extracting movie listings, theaters, and showtimes from BookMyShow.

> ⚠️ This project is still under development and currently has bugs/issues.

---

## Features

- Scrape movie listings
- Fetch theater names
- Extract showtimes
- City-based scraping
- Export data to JSON

---

## Status

This project is not fully stable yet.

### Known Bugs

- Some requests fail randomly
- Dynamic pages may not load correctly
- BookMyShow anti-bot protection can block requests
- Duplicate entries may appear
- Parsing can break if BookMyShow updates their site

---

## Installation

Clone the repo:

```bash
git clone https://github.com/dragonscraper/bookmyshow-scraper.git
cd bookmyshow-scraper
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

## Usage

Run scraper:

```bash
python run.py
```

Run for a specific city:

```bash
python scraper.py --city mumbai
```


---



---

## Tech Stack

- Python
- Requests
- BeautifulSoup

---

## TODO

- [ ] idk

---

## Disclaimer

This project is for educational purposes only.

Please respect BookMyShow's Terms of Service and rate limits.

---

## License

MIT License
