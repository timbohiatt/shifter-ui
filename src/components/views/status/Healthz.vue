<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
    <div>
        Healthz Checks:
        Base URL: {{$shifterConfig.API_BASE_URL}}
        Server Healthz: {{ServerHealthz}}
    </div>
</template>

<style>


</style>

<script>
  export default {
    data() {
        return { 
            ServerHealthz: {
                Message: "Error, Unable to reach Shifter Server"
            }
        }
    },
    mounted() {
        var config = {
            method: 'get',
            url: (this.$shifterConfig.API_BASE_URL+'/status/healthz'),
            headers: {
            
            },
            data : null
        };

            var self = this;
            this.axios(config)
            .then(function (response) {
                console.log(response)
                if(response.status === 200){
                    // Response Contains List of Converted File Objects
                    if (response.data.convertedFiles){
                        // Set Download File List with Response Data
                        self.downloads = response.data.convertedFiles
                    }
                }
                self.downloads = response.data.convertedFiles;
                if (self.downloads.length >= 1){
                    self.files = []
                    self.nextStep()
                }
            })
            .catch(function (error) {
                // Notification Error
                console.log(error)
                self.$notify({
                    title: "Conversion Error",
                    text: error,
                });
                console.log(error);
            });
          
      },
  }
</script>