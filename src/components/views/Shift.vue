<script setup>

</script>

<template>
    <div class="grid grid-cols-1 gap-10 mt-2 sm:mt-12 md:mt-20 lg:mt-40">
        <div class="grid grid-cols-1 px-2 sm:px-4 md:px-12 lg:px-24">
            <div class="p-3"><span class="font-semibold text-5xl tracking-tight text-teal-200">Shifter</span></div>
            <div class="bg-opacity-50 text-white rounded h-fill h-24 px-4 text-sm sm:text-base md:text-lg lg:text-xl">Shifting Workloads with Shifter is a simple three step process. Upload your OpenShift Manifest files, Convert them to Kubernetes Manifest files. Download your new manifest files for application to your Kubernetes, ATHOS or GKE clusters.</div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 px-2 sm:px-4 md:px-12 lg:px-24">
            <!-- Start: Step One -->
            <div class="border rounded-t-2xl rounded-b-none bg-opacity-50 text-white rounded h-fill p-2 sm:p-4 mb-10">
                <div class="grid grid-cols-1 gap-2 px-2">
                    <div>
                        <p class="text-base text-teal-200">Step One</p>
                    </div>
                    <div>
                        <p class="text-2xl text-teal-200">Upload Openshift Manifests</p>
                    </div>
                    <div class="pt-10">
                        <div id="app" @dragover.prevent @drop.prevent>
                            <div class="flex grow mx-4 border-2 rounded-t-xl rounded-b-none overflow-hidden" @dragleave="fileDragOut" @dragover="fileDragIn" @drop="handleFileDrop" > <!--v-bind:style="{ 'background-color': color }"-->
                                <!-- Start: Upload Zone -->
                                <div class="flex grow place-items-center min-h-full bg-gray-800 hover:bg-gray-700 file-wrapper h-80" @click="$refs.file.click()">
                                        <div><p class="text-xl text-teal-200">Drag & Drop or Click to Upload</p></div>
                                        <div><p class="text-md text-teal-200">Manifest files (.yaml .yml)</p></div>
                                        <div><BootstrapIcon class="text-teal-200" icon="cloud-arrow-up" size="5x"/></div>
                                </div>
                                <!-- End: Upload Zone -->
                            </div>
                        </div>
                        <!-- Hidden Uploader Object -->
                        <input class="hidden" type="file" ref="file" name="file-input" multiple="True" accept=".yaml, .yml" @change="handleFileInput">
                        <!-- Start: Uploaded File List -->
                        <ul id="selected-files" class="mt-2 px-4">
                            <li v-for="file, index in files" :key="file.name">
                                <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4 border-2 border-slate-800 px-4 py-2">
                                    <div>{{ file.name }}</div>
                                    <div>({{ file.size }} b)</div>
                                    <div>{{ file.message }}</div>
                                    <div><button @click="removeFile(index)" title="Remove" class="rounded-xl bg-black border-1 h-12 px-4 text-teal-200">Remove</button></div>
                                </div>
                            </li>
                        </ul>
                        <!-- End: Uploaded File List -->
                    </div>
                </div>
            
            </div>
            <!-- End: Step One -->
            <!-- Start: Step Two -->
            <div class="border rounded-t-2xl rounded-b-none bg-opacity-50 text-white rounded h-fill p-2 sm:p-4 mb-10">
                <p class="text-base text-teal-200">Step Two</p>
                <p class="text-2xl text-teal-200">Run Shifter</p>

                <div><button @click="upload" :disabled="disabledConvertButton" class="rounded-xl bg-black border-2 h-24 px-10 text-teal-200 my-8" :class="{ [`bg-gray-800 animate-pulse`]: !disabledConvertButton }">Convert {{filesToConvert}} Manifest Files</button></div>
            </div>
            <!-- End: Step Two -->
            <!-- Start: Step Three -->
            <div class="border rounded-t-2xl rounded-b-none bg-opacity-50 text-white rounded h-fill p-2 sm:p-4 mb-10">
                <p class="text-base text-teal-200">Step Three</p>
                <p class="text-2xl text-teal-200">Download Kubernetes Manifests</p>
                 <!-- Start: Download File List -->
                 <ul id="selected-files" class="mt-2 px-4">
                    <li v-for="file in downloads" :key="file.name">
                        <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 border-2 border-slate-800 px-4 py-2">
                            <div>{{ file.filename }}</div>
                            <!--<div>({{ file.size }} b)</div>-->
                            <!--<div>{{ file.message }}</div>-->
                            <div><button @click="downloadFile(file.link)" title="Download" class="rounded-xl bg-black border-1 h-12 px-4 text-teal-200">Download</button></div>
                        </div>
                    </li>
                </ul>
                <!-- End: Download File List -->
            </div>
            <!-- End: Step Three -->
        </div>
    </div>
</template>


<script>
  export default {
    data() {
        return { 
            file: '',
            files: [],
            downloads: [], 
            dragging: false

        }
    },
    computed: {
        disabledConvertButton(){
            if (this.filesToConvert >= 1){
                // Enable Button
                return false
            }
            //Disable Butotn
            return true
        },
        filesToConvert(){
            return this.files.length;
        }
    },  
    methods: {
        handleFileDrop(e) {
            let droppedFiles = e.dataTransfer.files;
            if(!droppedFiles) return;
            ([...droppedFiles]).forEach(f => {
                this.files.push(f);
            });
            this.color="#444444"
        },
        handleFileInput(e) {
            let files = e.target.files;
            files = e.target.files
                    if(!files) return;
            ([...files]).forEach(f => {
            
            this.files.push(f);
            });
        },
        removeFile(fileKey){
            this.files.splice(fileKey, 1)
        },
        fileDragIn(){
            this.color="white"
        },
        fileDragOut(){
            this.color="#444444"
        },

        downloadFile(link) {
            window.open("https://shifter.dev.timhiatt-gcp-labs.com/api/v1"+link)
        },

        upload(event) {

            var data = new FormData();
            for (let i = 0; i < this.files.length; i++) {
                data.append('multiplefiles', this.files[i]);
            }

            var config = {
                method: 'post',
                url: '/api/convert/yaml/yaml',
                headers: {
                'Content-Type': 'multipart/form-data'
                },
                data : data
            };

            var self = this;
            this.axios(config)
            .then(function (response) {
                console.log(response)
                self.downloads = response.data.convertedFiles;
                if (self.downloads.length >= 1){
                    self.files = []
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
  }
</script>


<style>

.file-wrapper {
  text-align: center;
  /*width: 300px;
  height: 5em;*/
  vertical-align: middle;
  display: table-cell;
  position: relative;
  overflow: hidden;
  /*background: gray;*/ /* and other things to make it pretty */
}


.file-wrapper input {
   
    cursor: pointer;
    opacity: 0.0;
    filter: alpha(opacity=0); /* and all the other old opacity stuff you
                                 want to support */
    /*font-size: 300px;*/
     /* wtf, but apparently the most reliable way to make
                         a large part of the input clickable in most browsers */
    /*height: 200px;*/
}

</style>
