import { mount } from 'vue-test-utils';
import expect from 'expect';
import Reminders from '../src/components/Reminders.vue';

describe('Reminders', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Reminders);
    });

    it('hides the reminders if the list is empty', () => {
        
        expect(wrapper.contains('ul')).toBe(false);
    });

    it('can add a reminder', () => {
        // Test the UI

        addReminder('Go to store');

        expect(remindersList()).toContain('Go to store');
    });

    it('can remove a reminder', () => {

        addReminder('Go to store');
        addReminder('Finish work');

        // every list item will have a trash can icon next to it
        let deleteButton = wrapper.find('ul > li:first-child .remove');

        deleteButton.trigger('click');

        expect(remindersList()).not.toContain('Go to store');
        // iff we want to check the test didn't remove all reminders
        expect(remindersList()).toContain('Finish work');
    });

    function addReminder(body) {
        let newReminder = wrapper.find('.new-reminder');
        
        newReminder.element.value = body;
        newReminder.trigger('input');

        wrapper.find('button').trigger('click');
    }

    function remindersList() {
        return wrapper.find('ul').text();
    }
});