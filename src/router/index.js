import { createRouter, createWebHistory } from 'vue-router';
import Normalinfo from '../components/body/normalInfo.vue';
import Reviewresult from '../components/body/reviewResult.vue';
import Datagraph from '../components/body/dataGraph.vue';
import Detailinfo from '../components/body/detailInfo.vue';
import Gradeeval from '../components/body/gradeEval.vue';

const routes = [
      {
        path: '/dataGraph',
        name: 'Datagraph',
        component: Datagraph,
      }, 
      {
        path: '/detailInfo',
        name: 'Detailinfo',
        component: Detailinfo,
      }, 
      {
        path: '/gradeEval',
        name: 'Gradeeval',
        component: Gradeeval,
      }, 
      {
        path: '/normalInfo',
        name: 'Normalinfo',
        component: Normalinfo,
      }, 
      {
        path: '/reviewResult',
        name: 'Reviewresult',
        component: Reviewresult,
      }, 
    ];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
