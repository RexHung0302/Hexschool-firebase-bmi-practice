<template lang="pug">
  #app.h-100
    .d-flex.flex-column.h-100
      button.d-md-none.position-absolute.btn-dark.border-background-primary(
          style="right: 10px;top: 10px;z-index: 30;",
          @click="headerShowHiddenHandler"
        )
          i.fas.fa-bars
      header.header.bg-dark(
        :class="{ 'show': showHeader }"
      )
        .container.py-3.py-md-5
          .row.flex-wrap.align-items-center
            .col-12.col-md-4.text-center.mb-2.mb-md-0
              img(
                :src="logo",
                width='117',
                height="117"
              )
            .col-12.col-md-4.mb-2.mb-md-0
              .d-flex.flex-wrap.align-items-center.justify-content-center
                .form-group.w-100
                  label.text-primary(for="height_input") 身高 cm
                  input.form-control#height_input.border-primary.bg-light-dark.text-light(
                    type="number",
                    placeholder="請輸入身高",
                    v-model="height",
                    :disabled="status === -1",
                    :class="{ 'cursore-no-drop': status === -1 }"
                  )
                .form-group.w-100
                  label.text-primary(for="weight_input") 體重 kg
                  input.form-control#weight_input.border-primary.bg-light-dark.text-light(
                    type="number",
                    placeholder="請輸入體重",
                    v-model="weight",
                    :disabled="status === -1",
                    :class="{ 'cursore-no-drop': status === -1 }"
                  )
            .col-12.col-md-4
              button.rounded-circle.bg-primary.text-dark.d-flex.align-items-center.justify-content-center.cursor-point.border-primary.mx-auto(
                style="width: 120px; height: 120px;",
                @click="sendBMIHandler",
                v-if="status === 0"
              )
                h4.mb-0 看結果
              .d-flex.align-items-center.justify-content-center(
                v-else
              )
                .border.border-width-lg.rounded-circle.d-flex.flex-wrap.align-items-center.justify-content-center.cursor-point.ml-auto.position-relative.mr-4(
                  style="width: 123px; height: 123px;",
                  :class="{'border-danger': bmi >= 35,'border-danger-light': bmi >= 27 && bmi <= 30,'border-warning': bmi >= 24 && bmi < 27,'border-success': bmi >= 18.5 && bmi < 24,'border-info': bmi >= 0 && bmi < 18.5}",
                  @click="resetHandelr"
                ) 
                  .text-center(
                    :class="{'text-danger': bmi >= 35,'text-danger-light': bmi >= 27 && bmi <= 30,'text-warning': bmi >= 24 && bmi < 27,'text-success': bmi >= 18.5 && bmi < 24,'text-info': bmi >= 0 && bmi < 18.5}"
                    style="line-height: 10px;"
                  )
                    h3.mb-0.w-100 {{ bmi }}
                    small BMI
                  .border.rounded-circle.d-flex.flex-wrap.align-items-center.justify-content-center.cursor-point.mx-auto.position-absolute.border-dark(
                    style="width: 30px; height: 30px;right: 0;bottom: 0;",
                    :class="{'bg-danger': bmi >= 35,'bg-danger-light': bmi >= 27 && bmi <= 30,'bg-warning': bmi >= 24 && bmi < 27,'bg-success': bmi >= 18.5 && bmi < 24,'bg-info': bmi >= 0 && bmi < 18.5}",
                  ) 
                    img.img-fluid(
                      :src="icons_loop",
                    )
                h3.mb-0(
                  :class="{'text-danger': bmi >= 35,'text-danger-light': bmi >= 27 && bmi <= 30,'text-warning': bmi >= 24 && bmi < 27,'text-success': bmi >= 18.5 && bmi < 24,'text-info': bmi >= 0 && bmi < 18.5}"
                ) {{ bmi >= 35 ? '重度肥胖' : bmi >= 30 ? '中度肥胖' : bmi >= 27 ? '輕度肥胖' : bmi >= 24 ? '過重' : bmi >= 18.5 ? '理想' : bmi >= 0 ? '過輕' : '壞掉啦' }}
      section.py-5.mb-auto.bg-gray.h-100.overflow-y-auto
        h4.text-center.mb-4 BMI 紀錄
        .container.d-flex.flex-column.align-items-center.justify-content-center(
          v-if="bmi_arr.length > 0"
        )
          ul.list-style-none.pl-0.mb-0.w-100
            li.w-100.mb-3(
              v-for="(datum,index) in bmi_arr"
            )
              .row.align-items-center.bg-background-primary.py-3.text-center.shadow.border-left.border-width-lg(
                :class="{'border-danger': datum.bmi >= 35,'border-danger-light': datum.bmi >= 30 && datum.bmi < 35,'border-danger-light': datum.bmi >= 27 && datum.bmi < 30,'border-warning': datum.bmi >= 24 && datum.bmi < 27,'border-success': datum.bmi >= 18.5 && datum.bmi < 24,'border-info': datum.bmi >= 0 && datum.bmi < 18.5}"
              )
                .col-12.col-md.mb-2.mb-md-0
                  span(
                    :class="{'text-danger': datum.bmi >= 35,'text-danger-light': datum.bmi >= 30 && datum.bmi < 35,'text-danger-light': datum.bmi >= 27 && datum.bmi < 30,'text-warning': datum.bmi >= 24 && datum.bmi < 27,'text-success': datum.bmi >= 18.5 && datum.bmi < 24,'text-info': datum.bmi >= 0 && datum.bmi < 18.5}"
                  ) {{ datum.bmi >= 35 ? '重度肥胖' : datum.bmi >= 30 ? '中度肥胖' : datum.bmi >= 27 ? '輕度肥胖' : datum.bmi >= 24 ? '過重' : datum.bmi >= 18.5 ? '理想' : datum.bmi >= 0 ? '過輕' : '壞掉啦' }}
                .col-12.col-md.mb-2.mb-md-0
                  small.text-dark.pr-1 BMI 
                  h5.d-inline-block.mb-0(
                    :class="{'text-danger': datum.bmi >= 35,'text-danger-light': datum.bmi >= 30 && datum.bmi < 35,'text-danger-light': datum.bmi >= 27 && datum.bmi < 30,'text-warning': datum.bmi >= 24 && datum.bmi < 27,'text-success': datum.bmi >= 18.5 && datum.bmi < 24,'text-info': datum.bmi >= 0 && datum.bmi < 18.5}"
                  ) {{ datum.bmi }}
                .col-12.col-md.mb-2.mb-md-0
                  small.text-dark.pr-1 weight 
                  h5.d-inline-block.mb-0 {{ datum.weight }}kg
                .col-12.col-md.mb-2.mb-md-0
                  small.text-dark.pr-1 height 
                  h5.d-inline-block.mb-0 {{ datum.height }}cm
                .col-12.col-md.mb-2.mb-md-0
                  small.text-dark {{ datum.date }}
                .col-12.col-md
                  button.btn.btn-danger(
                    @click="deleteHandler(datum.id)"
                  ) 刪除
          button.btn.btn-block.btn-danger(
            @click="deleteHandler('all')"
          ) 全部刪除

        h4.text-center.mb-4(
          v-else
        ) 無紀錄
      footer
        .bg-primary.py-3.text-center
          img(
            :src="logo_footer",
            width='55',
            height="55"
          )

</template>

<script>
export default {
  name: "App",
  data() {
    return {
      logo: require("@/assets/images/BMICLogo.png"),
      logo_footer: require("@/assets/images/BMICLogo_footer.png"),
      icons_loop: require("@/assets/images/icons_loop.png"),
      showHeader: false,
      status: 0, // 目前狀態(0 -> 可以計算, -1 -> 無法計算)
      height: null,
      weight: null,
      bmi: null,
      bmi_arr: [],
    };
  },
  created() {
    const vm = this;
    vm.$firebase.database().ref('BMI').orderByChild('date').on('value', function(snapshot){
      snapshot.forEach(i=>{
        let time_format = vm.$moment(i.val().date).format('DD-MM-YYYY');
        vm.bmi_arr.push({
          id: i.key,
          height: i.val().height,
          weight: i.val().weight,
          bmi: i.val().bmi,
          date: time_format,
        });
      })
      vm.bmi_arr.reverse();
      // 小彈窗
      vm.callToast('success', '更新成功');
    });
  },
  methods: {
    // 計算 BMI
    sendBMIHandler() {
      let vm = this;
      if (
        isNaN(parseInt(vm.height)) === true ||
        isNaN(parseInt(vm.weight)) === true
      ) {
        // 提示
        // alert('請輸入正確格式');
        vm.$swal({
          icon: "error",
          title: "輸入錯誤類型",
          text: "不得為空或請輸入數字",
          heightAuto: false,
        });
        return;
      }
      // 計算 BMI
      let bmi = (vm.weight / (((vm.height / 100) * vm.height) / 100)).toFixed(
        2
      );
      vm.bmi = bmi;
      let now_time = vm.$moment().valueOf();

      // 打API
      vm.$firebase.database().ref('BMI').push({
        height: vm.height,
        weight: vm.weight,
        bmi: bmi,
        date: now_time,
      });

      // 小彈窗
      vm.callToast('success', '新增成功');

      // 改變計算狀態
      vm.status = -1;
    },
    // 刪除
    deleteHandler(id) {
      const vm = this;
      if(!id) return;

      vm.$swal({
        icon: "question",
        title: "您的操作將無法回覆",
        html: id === 'all' ? '您確定執行全部資料清除嗎？' : id ? '您確定執行單筆刪除嗎？' : '',
        heightAuto: false,
        showCancelButton: true,
        confirmButtonText: '確定',
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.value) {
          // 全部刪除 及 單筆刪除
          if(id === 'all') {
            // 打API
            vm.$firebase.database().ref('BMI').remove();
            // 小彈窗
            vm.callToast('success', '全部資料刪除成功');
            vm.bmi_arr = [];
          } else {
            // 打API
            vm.$firebase.database().ref('BMI').child(id).remove();
            // 小彈窗
            vm.callToast('success', '單筆刪除成功');
          }
        }
      })
      
    },
    // 顯示 Header
    headerShowHiddenHandler() {
      const vm = this;
      vm.showHeader = !vm.showHeader
    },
    // 重置
    resetHandelr() {
      const vm = this;
      vm.height = null;
      vm.weight = null;
      vm.bmi = null;
      vm.status = 0;
    },
    // 小彈窗
    callToast(icon, title) {
      const vm = this;
      const Toast = vm.$swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', vm.$swal.stopTimer)
          toast.addEventListener('mouseleave', vm.$swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: icon,
        title: title
      })
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/all.scss";
@import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
</style>
