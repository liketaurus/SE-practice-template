import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import App from '..//..//App.vue';

describe('testing a wellcome page', async () =>{
    const wrapper = mount(App);
    wrapper.find('.red').trigger('click');

    it('question should change', async () =>{
        await wrapper.find('.arrow.rev').trigger('click');
        expect(wrapper.find('.arrow').exists()).toBe(true);
    })
    it('testing answer system', async () =>{
        await wrapper.find('.button-answer').trigger('click');
        expect(wrapper.vm.answerGiven).toBe(1);
    })
    it('progress bar should change', async () =>{
        expect(wrapper.find('.progress-bar').find('span').text()).toEqual('1/5');
    })
    it('testing does result button appears', () =>{
        wrapper.vm.answerGiven = 5;
        expect(wrapper.find('.finish').exists()).toBe(true);
    })
})