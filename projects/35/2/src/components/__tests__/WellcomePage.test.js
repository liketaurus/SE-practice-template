import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import App from '..//..//App.vue';

describe('put username', async () =>{
    const wrapper = mount(App);
    it('page and user name should change', async () =>{
        await wrapper.find('input[type="text"]').setValue('TestingName');
        await wrapper.find('button[type="submit"]').trigger('click');
        expect(wrapper.vm.pages.wellcomePage).toBe(false);
        expect(wrapper.vm.firstName).toEqual('TestingName');
    })  
})

describe('do not put username', async () =>{
    const wrapper = mount(App);
    it('page should change but not user name', async () =>{
        await wrapper.find('.red').trigger('click');
        expect(wrapper.vm.pages.wellcomePage).toBe(false);
        expect(wrapper.vm.firstName).toEqual(null);
    })
})