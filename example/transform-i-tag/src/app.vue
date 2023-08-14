<template>
  <div>
    <div class="accordion-item" :style="diffDay < 1 && 'border-color:#e6e9ef'">
      <div class="accordion-header">
        <a class="accordion-header-link" @click="onTabClick(item)" :id="item.id + '_header'">
          <div class="date">
            <h3>
              {{ diffDay > 0 ? diffDay : "已结束" }}
            </h3>
          </div>
          <Popover :close-delay="100" :open-delay="500" ref="popover" placement="right-start" trigger="hover">
            <div class="popover-body">
              <div class="speed-of-progress">
                <span style="background: #d6e4ff">
                  <i style="color: rgb(51 117 244)" class="ngiconfont ng-icon-NavigationChevronRight" />
                </span>
              </div>
            </div>
          </Popover>
        </a>
      </div>
    </div>
  </div>
</template>
