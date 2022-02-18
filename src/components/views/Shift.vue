<script setup>

</script>

<template>
    <div class="grid grid-cols-1 gap-10 mt-2 sm:mt-12 md:mt-12 lg:mt-12">
        <div class="grid grid-cols-1 px-2 sm:px-4 md:px-12 lg:px-24">
            <div class="p-3"><span class="font-semibold text-5xl tracking-tight text-teal-200">Shifter</span></div>
            <div class="bg-opacity-50 text-white rounded h-fill h-24 px-4 text-sm sm:text-base md:text-lg lg:text-xl">Shifting Workloads with Shifter is a simple three step process. Upload your OpenShift Manifest files, Convert them to Kubernetes Manifest files. Download your new manifest files for application to your Kubernetes, ATHOS or GKE clusters.</div>
        </div>
        <!-- OLD STYLE <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 px-2 sm:px-4 md:px-12 lg:px-24">-->
        <div class="grid grid-cols-1 lg:grid-cols-5">
            <div class="lg:visible"></div>
            <!-- Start: Step One -->
            <div v-if="formSteps.currentStep==1" class="lg:col-span-3 border rounded-2xl text-white rounded h-fill p-4">
                <div class="grid grid-cols-1 gap-2 px-2">
                    <div>
                        <p class="text-base text-teal-200">Step One</p>
                    </div>
                    <div>
                        <p class="text-2xl text-teal-200">Upload Openshift Manifests</p>
                    </div>
                    <div class="pt-2">
                        <div id="app" @dragover.prevent @drop.prevent>
                            <div class="flex grow m-4 p-4 border-2 border-dashed rounded-xl rounded overflow-hidden bg-gray-800 hover:bg-gray-700" @dragleave="fileDragOut" @dragover="fileDragIn" @drop="handleFileDrop" > <!--v-bind:style="{ 'background-color': color }"-->
                                <!-- Start: Upload Zone -->
                                <div class="flex grow place-items-center min-h-full file-wrapper h-80" @click="$refs.file.click()">
                                        <div><p class="text-xl text-teal-200">Drag & Drop or Click to Upload</p></div>
                                        <div><p class="text-md text-teal-200">Manifest files (.yaml .yml)</p></div>
                                        <div><BootstrapIcon class="text-teal-200" icon="cloud-arrow-up" size="5x"/></div>
                                        <!-- Start: Uploaded File List -->
                                        <ul id="selected-files" class="mt-2 px-4" @click.prevent>
                                            <li v-for="file, index in files" :key="file.name" class="mb-2">
                                                <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 border-2 border-white px-4 py-2 rounded-xl bg-black border text-white" >
                                                    <div class="text-left">{{ file.name }}</div>
                                                    <!--<div>({{ file.size }} b)</div>-->
                                                    <!--<div>{{ file.message }}</div>-->
                                                    <div class="text-right"><button @click="removeFile(index)" title="Remove" class="rounded-xl bg-black border-1 h-8 px-4 text-teal-200 uppercase">Remove</button></div>
                                                </div>
                                            </li>
                                        </ul>
                                        <!-- End: Uploaded File List -->
                                </div>
                                <!-- End: Upload Zone -->
                            </div>
                        </div>
                        <!-- Hidden Uploader Object -->
                        <input class="hidden" type="file" ref="file" name="file-input" multiple="True" accept=".yaml, .yml" @change="handleFileInput">
                    </div>

                   <!-- Form Control Buttons -->
                   <div class="grid grid-cols-3 gap-2 px-2">
                        <button  @click="formReset" :class="styleResetButton">START OVER</button>
                        <button  :disabled="!showPreviousButton" @click="previousStep" :class="stylePreviousButton" >PREVIOUS</button>
                        <button  :disabled="enableNextButton==false" @click="nextStep" :class="styleNextButton">NEXT</button>
                   </div>
                </div>
            </div>
            <!-- End: Step One -->
            <!-- Start: Step Two -->
            <div v-if="formSteps.currentStep==2" class="lg:col-span-3 border rounded-2xl text-white rounded h-fill p-4">
                <div class="grid grid-cols-1 gap-2 px-2">
                    <p class="text-base text-teal-200">Step Two</p>
                    <p class="text-2xl text-teal-200">Run Shifter</p>

                    <div class="h-20 text-4xl px-10 text-teal-200 my-8 uppercase align-c">Convert {{filesToConvert}} Manifest Files</div>
                    <!-- Form Control Buttons -->
                    <div class="grid grid-cols-3 gap-2 px-2">
                        <button  @click="formReset" :class="styleResetButton">START OVER</button>
                        <button  :disabled="!showPreviousButton" @click="previousStep" :class="stylePreviousButton" >PREVIOUS</button>
                        <button  :disabled="enableNextButton==false" @click="runShifter" :class="styleNextButton">SHIFT</button>
                    </div>
                </div>
            </div>
            <!-- End: Step Two -->
            <!-- Start: Step Three -->
            <div  v-if="formSteps.currentStep==3" class="lg:col-span-3 border rounded-2xl text-white rounded h-fill p-4">
               <div class="grid grid-cols-1 gap-2 px-2">
                    <p class="text-base text-teal-200">Step Three</p>
                    <p class="text-2xl text-teal-200">Download Kubernetes Manifests</p>
                    <!-- Start: Download File List -->
                    <ul id="selected-files" class="mt-2 px-4">
                        <li v-for="file in downloads" :key="file.name" class="mb-2">
                            <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 border-2 border-white px-4 py-2 rounded-xl bg-black border text-white" >
                                <div class="text-left">{{ file.filename }}</div>
                                <div class="text-right"><button @click="downloadFile(file.link)" title="Download" class="rounded-xl bg-black border-1 h-8 px-4 text-teal-200 uppercase">Download</button></div>
                            </div>
                        </li>
                    </ul>
                    <!-- End: Download File List -->
                    <!-- Form Control Buttons -->
                    <div class="grid grid-cols-3 gap-2 px-2">
                         <button  @click="formReset" :class="styleResetButton">START OVER</button>
                         <button  :disabled="!showPreviousButton" @click="previousStep" :class="stylePreviousButton" >PREVIOUS</button>
                         <button  :disabled="enableNextButton==false" @click="nextStep" :class="styleNextButton">NEXT</button>
                    </div>
               </div>
            </div>
            <!-- End: Step Three -->
            <div class="lg:visible"></div>
        </div>
    </div>
</template>


<script>
  export default {
    data() {
        return { 
            formSteps: {
                firstStep:1, 
                lastStep:3,
                currentStep:1,
                minimumRequiredFiles:1
            },
            files: [],
            downloads: [], 
            dragging: false

        }
    },
    computed: {

        formStepValidation(){
            // Validate Form Step One
            if (this.formSteps.currentStep === 1){
                if (this.filesSelected){
                    // Valid - Enable Button
                    return true
                }               
            }
            // Validate Form Step Two
            if (this.formSteps.currentStep === 2){
                if (this.filesSelected){
                    // Valid - Enable Button
                    return true
                }
            }
            // Validate Form Step Three
            if (this.formSteps.currentStep === 3){
                // Valid - Enable Button
                return true
            }
            // Current Form Step not Valid
            return false
        },

        enableNextButton(){
            if (this.formStepValidation){
                return true;
            }
            return false
        }, 
        enablePreviousButton(){
            if (this.showPreviousButton){
                return true;
            }
            return false
        }, 
        showNextButton(){
            // If the Current Step is not the last step.
            if (this.formSteps.currentStep !== this.formSteps.lastStep){
                // Show Next Button
                return true
            }
            // Hide Next Button
            return false
        },
        showPreviousButton(){
            // If the Current Step is not the first step.
            if (this.formSteps.currentStep !== this.formSteps.firstStep){
                // Show Previous Button
                return true
            }
            // Hide Previous Button
            return false
        },
        styleFormButton(){
            var style = ""
            style += "m-2 px-4 py-2 "
            style += "rounded-xl "
            style += "border "
            style += "text-white "
            return style
        }, 
        styleResetButton(){
            var style = this.styleFormButton
            return style
        },
        styleNextButton(){
            var style = this.styleFormButton

            if (this.enableNextButton){
                style += "bg-green-800 "
                style += "animate-pulse "
            }
            else{
                style += "bg-gray-600 "
                style += "blur-sm "
            }
            return style
        },
        stylePreviousButton(){
            var style = this.styleFormButton
            
            if (this.enablePreviousButton){

            }
            else{
                style += "bg-gray-600 "
                style += "blur-sm "
            }
            return style

            return style
        },
        filesSelected(){
            if(this.filesToConvert >= this.formSteps.minimumRequiredFiles){
                return true
            }
            return false
        },
        filesToConvert(){
            return this.files.length;
        }
    },  
    methods: {
        previousStep(){
            if (this.formSteps.currentStep !== this.formSteps.firstStep){
                 this.formSteps.currentStep-=1
            }
        },
        nextStep(){
             if (this.formSteps.currentStep !== this.formSteps.lastStep){
                  this.formSteps.currentStep+=1
            }
        },
        formReset(){
            this.files = []
            this.formSteps.currentStep = this.formSteps.firstStep
        },

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
            window.open("http://localhost:8082/api/v1"+link)
        },

        runShifter(event) {

            var data = new FormData();
            for (let i = 0; i < this.files.length; i++) {
                data.append('multiplefiles', this.files[i]);
            }

            var config = {
                method: 'post',
                url: ('api/convert/yaml/yaml'),
                headers: {
                'Content-Type': 'multipart/form-data'
                },
                data : data
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
                alert("hit an error")
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
