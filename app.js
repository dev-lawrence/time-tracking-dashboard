const buttons = document.querySelectorAll('.activity-tracker__option');
const activityReport = document.querySelector('.activity-report');

const clearActivities = () => {
  const activities = document.querySelectorAll('.activity');
  activities.forEach((activity) => activity.remove());
};

const calcTime = (option) => {
  if (option === 'daily') return 'Yesterday';
  if (option === 'weekly') return 'Last Week';
  if (option === 'monthly') return 'Last Month';
};

let isLoading = true;
const renderCards = (clickedOptions) => {
  clearActivities();

  //   setTimeout(() => {
  //     fetch('data.json')
  //       .then((res) => res.json())
  //       .then((data) => {
  //         data.forEach((data) => {
  //           const name = data.title;
  //           const activityClass = name.toLowerCase().replace(' ', '-');
  //           const timeFramesData = data.timeframes[clickedOptions];
  //           const previousTimeFramesData = calcTime(clickedOptions);
  //           const section = document.createElement('section');
  //           section.classList.add('activity', activityClass);
  //           section.innerHTML = `

  //           <div class="activity__bg">
  //               <img src="./images/icon-${activityClass}.svg" alt="" />
  //           </div>

  //           <div class="activity__content">
  //               <div class="activity__info">
  //                   <span class="title">${name}</span>
  //                   <button><i class="fa-solid fa-ellipsis"></i></button>
  //               </div>
  //               <div class="activity__timeframes">
  //                   <h2 class="current">${timeFramesData.current}hrs</h2>
  //                   <p>${previousTimeFramesData} - <span class="previous">${timeFramesData.previous}hrs</span></p>
  //               </div>
  //           </div>

  //       `;

  //           activityReport.appendChild(section);
  //           isLoading != true;
  //         });
  //       });
  //   }, 2000);
  // };

  if (isLoading) {
    activityReport.innerHTML = `
       <div>Loading....</div>
     `;
    // console.log(isLoading);
  }

  // demo start
  // setTimeout(() => {
  fetch('data.json')
    .then((res) => res.json())
    .then((data) => {
      data.forEach((data) => {
        const name = data.title;
        const activityClass = name.toLowerCase().replace(' ', '-');
        const timeFramesData = data.timeframes[clickedOptions];
        const previousTimeFramesData = calcTime(clickedOptions);
        const section = document.createElement('section');
        section.classList.add('activity', activityClass);
        section.innerHTML = `
     
    
        <div class="activity__bg">
            <img src="./images/icon-${activityClass}.svg" alt="" />
        </div>

        <div class="activity__content">
            <div class="activity__info">
                <span class="title">${name}</span>
                <button><i class="fa-solid fa-ellipsis"></i></button>
            </div>
            <div class="activity__timeframes">
                <h2 class="current">${timeFramesData.current}hrs</h2>
                <p>${previousTimeFramesData} - <span class="previous">${timeFramesData.previous}hrs</span></p>
            </div>
        </div>

    
    `;

        activityReport.appendChild(section);
      });
    });

  isLoading = false;
  activityReport.innerHTML = '';
  // }, 2000);
};

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    // switch active state between each button
    const active = document.querySelector('.active');
    active.classList.remove('active');
    button.classList.add('active');

    let clickedOptions = button.dataset.option;

    renderCards(clickedOptions);
  });
});

const showActivity = () => {
  buttons[0].click();
};

window.addEventListener('DOMContentLoaded', showActivity);
