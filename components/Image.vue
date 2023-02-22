<script setup lang="ts">
interface IProps {
    src: string
}
const props = defineProps<IProps>()
const a: HTMLDivElement = {};
a.dispatchEvent(new CustomEvent('2', {
    bubbles: true,

}))
</script>

<template>
    <img :src="src" />
</template>