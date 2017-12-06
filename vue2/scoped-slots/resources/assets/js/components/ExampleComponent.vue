<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <ul>
                        <li v-for="item in items" v-text="item">
                            <slot name="menu-item" :items="items">{{ items }}</slot>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['items']
    }
</script>
