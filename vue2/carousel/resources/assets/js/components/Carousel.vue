<template>

    <div data-flickity='{ "cellAlign": "left", "contain": true, "wrapAround": true }'>
        <slot></slot>
    </div>

</template>

<script>
import Flickity from 'flickity';
// Styles can be imported from the node modules if NPM was used:
import 'flickity/dist/flickity.min.css';

    export default {
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
