/* global Chart */

{
  'use strict';

  /* Chart */

  const ctx = document.getElementById('myChart').getContext('2d');

  const chart = new Chart(ctx, {
    // 1
    type: 'bar',
    data: {
    // 2
      labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
      // 3
      datasets: [{
        // 4
        label: 'Signups',
        // 5
        backgroundColor: '#8DBEC8',
        borderColor: '#8DBEC8',
        // 6
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
        // 7
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

  //Zamykanie modala poprzez usunięcie klasy 'show' z owerlaya
  function closeModal() {
    document.getElementById('overlay').classList.remove('show');
  }

  //Podpinamy funkcje pod przyciski 'js--close-modal'
  document.querySelectorAll('#overlay .js--close-modal').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      closeModal();
    });
  });

  //Dodajemy możliwość zamknięcia modala po kliknięciu w tło overlaya
  document.querySelector('#overlay').addEventListener('click', function(e) {
    if(e.target === this) {
      closeModal();
    }
  });

  //oraz zamykanie przez kliknięcie ESC na klawiaturze
  document.addEventListener('keyup', function(e) {
    if(e.keyCode === 27) {
      closeModal();
    }
  });

  // OTWIERANIE MODALA
  function openModal(modal) {
    document.querySelectorAll('#overlay > *').forEach(function(modal) {
      modal.classList.remove('show');
    });
    document.querySelector('#overlay').classList.add('show');
    document.querySelector(modal).classList.add('show');
  }

  // Nasłuchiwacz na wszystkie modale (do elementu nalezy tylko dodać class="modal-btn" oraz atrybut data-modal="id modala")
  for(let modalElem of document.querySelectorAll('.modal-btn')) {

    modalElem.addEventListener('click', function(e) {
      e.preventDefault();
      let clickedModal = e.target.getAttribute('data-modal') || e.currentTarget.getAttribute('data-modal');
      openModal('#' + clickedModal);
    });
  }

  /* Init Pages */

  const mainNav = {
    
    initPages: function() {

      this.pages = document.querySelector('#sidebar-menu').children;
      this.navLinks = document.querySelectorAll('.main-nav-item');
      console.log('this.pages:', this.pages);
      console.log('this.navLinks:', this.navLinks);
  
      const idFromHash = window.location.hash.replace('#/', '');
      let pageMatchingHash = this.pages[0].id;
  
      for(let page of this.pages) {
        if(page.id == idFromHash) {
          pageMatchingHash = page.id;
          break;
        }
      }
      console.log('pageMatchingHash:', pageMatchingHash);
      this.activatePage(pageMatchingHash);
  
      for(let link of this.navLinks) {
        link.addEventListener('click', function(e) {
          const clickedElement = this;
          console.log('1. clickedElement:', clickedElement);
          e.preventDefault();
  
          const id = clickedElement.getAttribute('data-id').replace('#', '');
          mainNav.activatePage(id);
          window.location.hash = '#/' + id;
        });
      }
    },
  
    activatePage: function(pageId) {
      
      for(let page of this.pages) {
        page.classList.toggle('activePage', page.id == pageId);
      }

      for(let link of this.navLinks) {
        link.classList.toggle('activePage', link.getAttribute('data-id') == '#' + pageId
        );
      }
    },
      
    init: function() {
      console.log('*** Welcome ***');
      this.initPages();
    },
  };
  mainNav.init();

}