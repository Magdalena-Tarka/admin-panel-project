/* global Chart */

{
  'use strict';

  /* Chart */

  const ctx = document.getElementById('myChart').getContext('2d');

  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
      datasets: [{
        label: 'Signups',
        backgroundColor: '#8DBEC8',
        borderColor: '#8DBEC8',
        data: [ 52, 51, 41, 94, 26, 6, 72, 9, 21, 88 ],
      },
      {
        label: 'FTD',
        backgroundColor: '#F29E4E',
        borderColor: '#F29E4E',
        data: [ 6, 72, 1, 0, 47, 11, 50, 44, 63, 76 ],
      },
      {
        label: 'Earned',
        backgroundColor: '#71B374',
        borderColor: '#71B374',
        data: [ 59, 49, 68, 90, 67, 41, 13, 38, 48, 48 ],
        hidden: true,
      }]
    },
  });
  console.log(chart);


  /* Toggle Mobile-Menu */

  function toggleMenu(visible) {
    document.getElementById('menu').classList.toggle('show-menu', visible);
  }

  document.querySelector('.menu-toggler').addEventListener('click', function(e) {
    e.preventDefault();
    console.log(e.target);
    toggleMenu();
  });


  /* Modals */

  //CLOSE MODAL
  function closeModal() {
    document.getElementById('overlay').classList.remove('show');
  }

  document.querySelectorAll('#overlay .js--close-modal').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      closeModal();
    });
  });

  document.querySelector('#overlay').addEventListener('click', function(e) {
    if(e.target === this) {
      closeModal();
    }
  });

  document.addEventListener('keyup', function(e) {
    if(e.keyCode === 27) {
      closeModal();
    }
  });

  //OPEN MODAL
  function openModal(modal) {
    document.querySelectorAll('#overlay > *').forEach(function(modal) {
      modal.classList.remove('show');
    });
    document.querySelector('#overlay').classList.add('show');
    document.querySelector(modal).classList.add('show');
  }

  //Event listenners for all modals (just add class="modal-btn" to the DOM element)
  for(let modalElem of document.querySelectorAll('.modal-btn')) {

    modalElem.addEventListener('click', function(e) {
      e.preventDefault();
      let clickedModal = this.getAttribute('data-modal');
      openModal('#' + clickedModal);
    });
  }


  /* Init Pages */
    
  function initPages() {

    this.pages = document.querySelectorAll('.subpage-wrapper');
    this.navLinks = document.querySelectorAll('.main-nav-item');
  
    const idFromHash = window.location.hash.replace('#/', '');
    let pageMatchingHash = this.pages[0].id;
  
    for(let page of this.pages) {
      if(page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }
    this.activatePage(pageMatchingHash);
  
    for(let link of this.navLinks) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const id = this.querySelector('a').getAttribute('href').replace('#', '');
        activatePage(id);
        window.location.hash = '#/' + id;
      });
    }
  }
  
  function activatePage(pageId) {
      
    for(let page of this.pages) {
      page.classList.toggle('active-page', page.id == pageId);
    }

    for(let link of this.navLinks) {
      link.classList.toggle('active-page', link.getAttribute('data-id') == '#' + pageId
      );
    }
  }
      
  initPages();
  console.log('*** Welcome ***');
}