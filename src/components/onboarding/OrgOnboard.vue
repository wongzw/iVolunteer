<template>
    <label class="fontLogin">Organisation Type</label><br />
    <a-select
    v-model:value="orgType"
    mode="tags"
    style="width: 60%; height: 35px; margin-bottom: 10px"
    :token-separators="[',']"
    placeholder="Press tab to enter additional type"
    ></a-select>   
</template>

<script>
export default {
    
}
</script>>

