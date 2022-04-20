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
                Response: "",
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
                    // Response Contains Healthz Response from Shifter Server
                    if (response.data){
                        // Store Response Data
                        self.ServerHealthz.Response = response.data;
                        self.ServerHealthz.Message = response.data.message
                    }
                }
            })
            .catch(function (error) {
                // Notification Error
                console.log(error)
                self.$notify({
                    title: "Error: Unable to Reach Shifter Server",
                    text: error,
                });
                console.log(error);
            });
          
      },
  }
</script>