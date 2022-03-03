<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
    <div>
        Healthz Checks:
        Base URL: {{$shifterConfig.API_BASE_URL}}
        Server Healthz: {{ServerSettingz}}
    </div>
</template>

<style>


</style>

<script>
  export default {
    data() {
        return { 
            ServerSettingz: {
                Response: "",
                Message: "Error, Unable to reach Shifter Server"
            }
        }
    },
    mounted() {
        var config = {
            method: 'get',
            url: (this.$shifterConfig.API_BASE_URL+'/status/settingz'),
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
                        self.ServerSettingz.Response = response.data;
                        self.ServerSettingz.Message = response.data.message
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