<template>
  <header :class="$style.header">
    <div :class="$style.headerTop">
      <div :class="[$style.container, 'container d-flex']">
        <img src="/logo.png" alt="TruyenBT" :class="$style.logo" />
        <ul :class="$style.topLinks">
          <li>
            <a href="#">TRANG CHỦ</a>
          </li>
          <li>
            <a href="#">LỊCH SỬ</a>
          </li>
          <li>
            <a href="#">TRUYỆN TOP</a>
          </li>
        </ul>
      </div>
    </div>
    <div :class="$style.headerBottom">
      <div class="container d-flex">
        <ul :class="$style.bottomLink">
          <li>
            <a href="#">TRANG CHỦ</a>
          </li>
          <li>
            <a href="#">LỊCH SỬ</a>
          </li>
          <li>
            <a href="#">TRUYỆN TOP</a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style lang="scss" module>
.header {
  .headerTop {
    height: 100px;
    background: linear-gradient(to right, $primary 40%, $secondary);
    .container {
      height: inherit;

      .topLinks {
        padding: 0;
        margin: 0;
        list-style: none;
        justify-content: center;
        display: flex;
        align-items: center;
        li {
          margin-right: 40px;
          a {
            color: $white;
            text-decoration: none;
            position: relative;
            &:before {
              content: '';
              transition: 0.2s all;
              height: 2px;
              width: 0;
              background: $white;
              opacity: 0.5;
              display: block;
              position: absolute;
              bottom: -8px;
              left: 50%;
              transform: translateX(-50%);
            }
            &:hover {
              &:before {
                transition: 0.2s all;
                width: 70%;
              }
            }
          }
        }
      }

      .logo {
        height: 100%;
      }
    }
  }
  .headerBottom {
    height: 50px;
    border-bottom: 1px solid $gray-200;
    display: flex;
    .bottomLink {
      padding: 0;
      margin: 0;
      list-style: none;
      justify-content: center;
      display: flex;
      align-items: center;
      li {
        margin-right: 40px;
        a {
          color: $gray-600;
          text-decoration: none;
          font-weight: $font-weight-bold;
          &:hover {
            color: $primary;
          }
        }
      }
    }
  }
}
</style>
