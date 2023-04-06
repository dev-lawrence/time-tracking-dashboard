const buttons = document.querySelectorAll('.activity-tracker__option');
const reportStats = document.querySelector('.report-stats');

const clearActivities = () => {
  const activities = document.querySelectorAll('.activity');
  activities.forEach((activity) => activity.remove());
};

const renderCards = (clickedOptions) => {
  clearActivities();

  const calcTimeFrame = (option) => {
    if (option === 'daily') return 'Yesterday';
    if (option === 'weekly') return 'Last Week';
    if (option === 'monthly') return 'Last Month';
  };

  fetch('data.json')
    .then((res) => res.json())
    .then((data) => {
      data.forEach((data) => {
        const name = data.title;
        const activityClass = name.toLowerCase().replace(' ', '-');
        const timeFramesData = data.timeframes[clickedOptions];
        const previousTimeFramesData = calcTimeFrame(clickedOptions);
        const section = document.createElement('section');
        section.className = 'activity';

        section.innerHTML = `
            <div class = "activity">
                <div class="d-flex">
                    <span class="title">${name}</span>
                </div>

                <h1 class="current">${timeFramesData.current}hrs</h1>
                <p>${previousTimeFramesData} - <span class="previous">${timeFramesData.previous}</span></p>
            </div>
        
        `;

        reportStats.appendChild(section);
      });
    });
};

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const clickedOptions = button.dataset.option;
    renderCards(clickedOptions);
  });
});

const showData = () => {
  buttons[0].click();
};

window.addEventListener('DOMContentLoaded', showData);
