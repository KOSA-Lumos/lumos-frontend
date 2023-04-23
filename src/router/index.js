import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../components/body/mainPage.vue';
import DetailGrade from '../components/footer/detailGrade.vue';
import FooterMeals from '../components/footer/footerMeals.vue';
import FooterPictures from '../components/footer/footerPictures.vue';
import FooterCctv from '../components/footer/footerCctv.vue';
import DetailView from '../components/footer/detailView.vue';

const routes = [
  {
    children: [
      {
        path: '/mainPage',
        name: 'mainPage',
        component: MainPage,
      }, 
      {
        path: '/detailGrade',
        name: 'DetailGrade',
        component: DetailGrade,
      }, 
      {
        path: '/footerMeals',
        name: 'FooterMeals',
        component: FooterMeals,
      }, 
      {
        path: '/footerPictures',
        name: 'FooterPictures',
        component: FooterPictures,
      }, 
      {
        path: '/footerCctv',
        name: 'FooterCctv',
        component: FooterCctv,
      }, 
      {
        path: '/detailView',
        name: 'DetailView',
        component: DetailView,
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
