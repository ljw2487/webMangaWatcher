<template>
    <div>
        <button @click="goHome">Go</button>
    </div>
</template>

<script>
    export default {
        methods: {
            goHome() {
                this.$router.push('/index')
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>