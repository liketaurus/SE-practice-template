import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import App from '..//..//App.vue';

describe('testing a wellcome page', async () =>{
    const wrapper = mount(App);
    wrapper.find('.red').trigger('click');
    wrapper.setData({pages: {wellcomePage: false, quizePage: false, resultPage: true}})
    it('there is should be a restart button', () => {
        expect(wrapper.find('.restart').exists()).toBe(true);
    })
    it('testing a functionality of the restart button', async () => {
        await wrapper.find('.restart').trigger('click');
        expect(wrapper.vm.pages.quizePage).toBe(true);
    })
})