<template>

    <!-- These attributes will now be instanciated when the component is mounted -->
    <!-- <div data-flickity='{ "cellAlign": "left", "contain": true, "wrapAround": true }'> -->
    <div>
        <slot></slot>
    </div>

</template>

<script>
import Flickity from 'flickity';
// Styles can be imported from the node modules if NPM was used:
import 'flickity/dist/flickity.min.css';

    export default {
        props: {
            wraparound: { default: true },
            autoplay: { default: false }
        },

        mounted() {
            // Instanciate Flickity
            new Flickity(this.$el, {
                wrapAround: this.wraparound,
                autoPlay: this.autoplay,
                cellAlign: 'left',
                contain: true
            });
        }
    }
</script>
