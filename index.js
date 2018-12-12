/* Gets a JSON file and passes the result to a callback function. */
function getJSON(url, callback) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      try {
        var data = JSON.parse(xmlhttp.responseText);
      } catch (err) {
        console.log(`${err.message} in ${xmlhttp.responseText}`);
        return;
      }
      callback(data);
    }
  }
  xmlhttp.open('GET', url, true);
  xmlhttp.send();
}

/* Adds the article's image to an element with a link to the article. */
function addImage(element, article) {
  const image = new Image();
  image.src = article.image;
  image.classList.add('image');
  const link = document.createElement('a');
  link.href = article.link;
  link.target = '_blank';
  link.appendChild(image);
  element.appendChild(link);
}

/* Adds a row containing the article's date and section. */
function addDateSection(element, article) {
  const container = document.createElement('div');
  container.classList.add('row', 'date-section');
  const dateContainer = document.createElement('div');
  dateContainer.classList.add('col-6', 'text-right');
  const date = document.createElement('p');
  date.innerHTML = article.date;
  dateContainer.appendChild(date);
  const sectionContainer = document.createElement('div');
  sectionContainer.classList.add('col-6');
  const section = document.createElement('p');
  section.innerHTML = article.section;
  sectionContainer.appendChild(section);
  container.appendChild(sectionContainer);
  container.appendChild(dateContainer);
  element.appendChild(container);
}

/* Using a given heading, adds the article's title and link to an element. */
function addTitle(element, article, heading) {
  const title = document.createElement(heading);
  title.innerHTML = article.title;
  const link = document.createElement('a');
  link.href = article.link;
  link.classList.add('article-link');
  link.target = '_blank';
  link.appendChild(title);
  element.appendChild(link);
}

/* Adds a paragraph to the given element. Used for descriptions and credits. */
function addDescription(element, article, credit = false) {
  const desc = document.createElement('p');
  if (credit) desc.classList.add('credit');
  desc.innerHTML = credit ? article.author : article.description;
  element.appendChild(desc);
}

/* Builds the text elements in a set order. Takes in an optional heading. */
function buildText(element, article, heading = 'h2') {
  addDateSection(element, article);
  addTitle(element, article, heading);
  addDescription(element, article);
  addDescription(element, article, true);
}

function render(articles) {
  /* CENTERPIECE */
  addImage(document.getElementById('centerpiece-image'), articles.featured[0]);
  buildText(document.getElementById('centerpiece-text'), articles.featured[0]);

  /* FEATURED */
  for (let i = 1; i < articles.featured.length; i++) {
    // there should be no more than three projects in the featured array
    if (i > 2) break;

    const element = document.getElementById(`featured-${i}`);
    addImage(element, articles.featured[i]);
    buildText(element, articles.featured[i], 'h3');

    // for the first featured project, add an hr to separate the two on mobile
    if (i === 1) {
      const hr = document.createElement('hr');
      hr.classList.add('d-block', 'd-md-none');
      element.appendChild(hr);
    }
  }

  /* ALL PROJECTS */
  const all = document.getElementById('all-projects');
  // don't show this section if there are no projects in the array
  if (articles.articles.length) all.style.display = 'block';
  for (const article of articles.articles) {
    const element = document.createElement('div');
    element.classList.add('row');
    const image = document.createElement('div');
    image.classList.add('col-md-6', 'col-lg-4');
    const text = document.createElement('div');
    text.classList.add('col-md-6', 'col-lg-8', 'article-text');
    addImage(image, article);
    buildText(text, article, 'h4');
    element.appendChild(image);
    element.appendChild(text);
    all.appendChild(element);
    // add an hr between each project
    all.appendChild(document.createElement('hr'));
  }
}

getJSON('projects.json', render);
