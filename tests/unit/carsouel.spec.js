// 流行的测试框架 jest 只能通过jsdom来测试 无法真的把我的组件跑到浏览器上
// karma(提供一个浏览器框架 ) + mocha + chai + vue test /utils
import {
  shallowMount
} from '@vue/test-utils'

import Carousel from '@/packages/carousel/carousel.vue';
import CarouselItem from '@/packages/carousel/carousel-item.vue';
import Button from '@/packages/button/button.vue';
import Icon from '@/packages/icon/icon.vue';

import {
  expect
} from 'chai';
// 套件 
describe('测试 当前 Carousel组件', () => {
  it('测试 initialIndex 传入后是否符合我的预期 1', () => {
      let wrapper = shallowMount(Carousel, {
          attachToDocument:true, // 我要启动浏览器 把他跑在浏览器上看效果
          stubs:{
              'zyl-carousel-item':CarouselItem,
              'zyl-button':Button,
              'zyl-icon':Icon
          },
          slots: {
              default: `
              <zyl-carousel-item>
                <div class="content bg-purple-dark">
                  内容1
                </div>
              </zyl-carousel-item>
              <zyl-carousel-item>
                <div class="content bg-purple">
                  内容2
                </div>
              </zyl-carousel-item>
              <zyl-carousel-item>
                <div class="content bg-purple-dark">
                  内容3
                </div>
              </zyl-carousel-item>
              `
          },
          propsData:{
              initialIndex:0
          }
      });
      let item = wrapper.findAll('.content');
      expect(item.length).to.eq(1);
      expect(item.at(0).text()).to.eq('内容1')
  })
  it('测试 initialIndex 传入后是否符合我的预期 2', () => {
      let wrapper = shallowMount(Carousel, {
          attachToDocument:true, // 我要启动浏览器 把他跑在浏览器上看效果
          stubs:{
              'zyl-carousel-item':CarouselItem,
              'zyl-button':Button,
              'zyl-icon':Icon
          },
          slots: {
              default: `
              <zyl-carousel-item>
                <div class="content bg-purple-dark">
                  内容1
                </div>
              </zyl-carousel-item>
              <zyl-carousel-item>
                <div class="content bg-purple">
                  内容2
                </div>
              </zyl-carousel-item>
              <zyl-carousel-item>
                <div class="content bg-purple-dark">
                  内容3
                </div>
              </zyl-carousel-item>
              `
          },
          propsData:{
              initialIndex:1
          }
      });
      let item = wrapper.findAll('.content');
      expect(item.length).to.eq(1);
      expect(item.at(0).text()).to.eq('内容2')
  })

  // 触发点击事件 
})
