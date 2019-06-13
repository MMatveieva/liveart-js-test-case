<template>
    <main class="wrapper">
        <article>
            <canvas id="fabric-canvas"></canvas>
            <el-row class="mt-3">
                <el-tooltip content="To Front">
                    <el-button @click="handleToFront" plain size="medium" icon="el-icon-upload2"></el-button>
                </el-tooltip>
                <el-tooltip content="To Back">
                    <el-button @click="handleToBack" plain size="medium" icon="el-icon-download"></el-button>
                </el-tooltip>
                <el-button @click="handleDelete" type="danger" plain size="medium" icon="el-icon-delete"></el-button>
            </el-row>
        </article>
        <el-tabs v-model="activeTab" style="text-align: center">
            <el-tab-pane label="Text" name="first">
                <label class="label mt-3">
                    ID:
                    <span>{{id_gen+1}}</span>
                </label>
                <el-input placeholder="Your Text Here" v-model="selectedText.text" clearable
                          class="mt-3"></el-input>
                <el-row class="mt-3" style="display: flex;">
                    <el-select v-model="selectedText.font" placeholder="Select Font" class="mr-3">
                        <el-option label="Comic Sans" value="Comic Sans"></el-option>
                        <el-option label="Arial" value="Arial"></el-option>
                        <el-option label="Times New Roman" value="Times New Roman"></el-option>
                    </el-select>
                    <el-color-picker v-model="selectedText.color" class="mr-3"></el-color-picker>
                    <el-button size="medium" @click="handleAddText" type="primary">Add Text</el-button>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="Image" name="second">
                <label class="label">
                    ID:
                    <span>{{id_gen}}</span>
                </label>
                <!--<div class="load-photo">-->
                <!--<b-form-file v-model="file" class="mt-3" plain></b-form-file>-->
                <!--</div>-->
                <el-row class="mt-3">
                    <el-input placeholder="Image URL" v-model="imgURL" clearable>
                        <el-button slot="append" @click="handleImportIMG">Add</el-button>
                    </el-input>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="Import/Export" name="third">
                <el-input type="textarea" :rows="5" placeholder="SVG" v-model="svg">{{svg}}</el-input>
                <el-row class="mt-3">
                    <el-button size="medium" type="primary" @click="handleExport">Export SVG</el-button>
                    <el-button size="medium" @click="handleImport">Import SVG</el-button>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </main>
</template>

<script lang="ts">
    import Vue from "vue";
    import ElementUI from "element-ui";
    import 'element-ui/lib/theme-chalk/index.css'
    import BootstrapVue from 'bootstrap-vue'
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    Vue.use(BootstrapVue);
    Vue.use(ElementUI);

    export default ({
        name: 'App',
        data() {
            return {
                id_gen: 1,
                id_photo: -1,
                activeTab: "first",
                unusedData: "stub",
                svg: "",
                file: "",
                img: {
                    imgURL: "",
                    filter: ""
                },
                selectedText: {
                    text: "Default text",
                    font: "Comic Sans",
                    color: "black",
                    id: -1
                }
            };
        },
        beforeCreate: function () {
            this.id_photo = this.id_gen;
            this.selectedText.id = this.id_gen + 1;
        },

        methods: {
            setSVG(data) {
                this.svg = data;
            },

            setData(payload) {
                if (payload.selectedText) {
                    this.selectedText = payload.selectedText;
                }
            },

            handleAddText() {
                this.id_gen += 1;
                this.$emit("addText", this.selectedText);
            },

            handleDelete() {
                this.$emit("deleteClick");
            },

            handleToFront() {
                this.$emit("toFrontClick");
            },

            handleToBack() {
                this.$emit("toBackClick");
            },

            handleExport() {
                this.$emit("exportSVG");
            },

            handleImport() {
                this.$emit("importSVG", this.svg);
            },

            handleClick(event) {
                this.$emit("buttonClick", event);
            },

            handleImportIMG() {
                const {url, filter} = this.img;
                this.$emit("importIMG", url, filter);
            }
        }
    });
</script>

<style lang="scss" scoped>
    //UI common styles
    /*@import url("//unpkg.com/element-ui@2.7.2/lib/theme-chalk/index.css");*/

    //Spacings
    $spacer: 16px;

    .mt-3 {
        margin-top: $spacer;
    }

    .mr-3 {
        margin-right: $spacer;
    }

    //Custom styles
    .label {
        font-size: 13px;
    }
</style>