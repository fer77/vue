import { mount } from 'vue-test-utils';
import expect from 'expect';
import Question from '../src/components/Question.vue';

describe('Question', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Question, {
            // passes data as a prop
            propsData: {
                dataQuestion: {
                    title: 'The title',
                    body: 'The body'
                }
            }
        });
    });

    it('presents the title and the body', () => {

        see('The title');
        see('The body');
    });

    it('can be edited', () => {
        expect(wrapper.contains('input[name=title]')).toBe(false);

        click('#edit');

        expect(wrapper.find('input[name=title]').element.value).toBe('The title');
        expect(wrapper.find('textarea[name=body]').element.value).toBe('The body');
    });

    it('hides the edit button when in editing mode', () => {
        click('#edit');

        expect(wrapper.contains('#edit')).toBe(false);
    });

    it('it updates the question after being edited', () => {
        click('#edit');

        type('input[name=title]', 'Changed title');
        type('textarea[name=body]', 'Changed body');

        click('#update');

        see('Changed title');
        see('Changed body');
    });

    it('can cancel out of edit mode', () => {
        click('#edit');

        type('input[name=title]', 'Changed title');

        click('#cancel');

        see('The title');
    });

    // see('foobar', '#sub')
    let see = (text, selector) => {
        let wrap = selector ? wrapper.find(selector) : wrapper;

        expect(wrap.html()).toContain(text);
    };

    let type = (selector, text) => {
        let node =  wrapper.find(selector);
        
        node.element.value = text;
        node.trigger('input'); // triggers an input event so vue can detect it
    }

    let click = selector => {
        wrapper.find(selector).trigger('click');
    }
});