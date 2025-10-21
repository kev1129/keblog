<template>
    <v-container>
        <div class="contact">
            <!-- <div class="contact-element">contact.keblog@gmail.com</div> -->
            <div class="contact-element">
                <NuxtLink to="https://www.instagram.com/shinadooo">instagram</NuxtLink>
            </div>
            <!--             
            <div class="contact-element">
                <NuxtLink to="https://buymeacoffee.com/shinado">buy me a coffee</NuxtLink>                
            </div>
            -->
        </div>
    </v-container>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.contact {
    font-size: 0.9rem;
    opacity: 0.66;
    text-align: center;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .contact-element {
        padding: 14px;
    }
}
</style>