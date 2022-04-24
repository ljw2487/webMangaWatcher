<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
  data() {
    return {


    }
  },
  mounted () {
    let logo =`
      =================================================================================================
      ==                                                                                             ==
      ==  ██████████████╗  ██████╗ ██████╗ ███╗   ███╗██╗ ██████╗███████╗ █████╗ ███╗   ██╗███████╗  ==
      ==  █╔═══════════█║ ██╔════╝██╔═══██╗████╗ ████║██║██╔════╝██╔════╝██╔══██╗████╗  ██║██╔════╝  ==
      ==  █║ █╗     █╗ █║ ██║     ██║   ██║██╔████╔██║██║██║     █████╗  ███████║██╔██╗ ██║███████╗  ==
      ==  █║ ╚╝     ╚╝ █║ ██║     ██║   ██║██║╚██╔╝██║██║██║     ██╔══╝  ██╔══██║██║╚██╗██║╚════██║  ==
      ==  ██████████████║ ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║╚██████╗██║     ██║  ██║██║ ╚████║███████║  ==
      ==  ╚═════════════╝  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝ ╚═════╝╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝  ==
      ==                                                                                             ==
      =================================================================================================
      This comic site is for my personal use and practice only, and all the resources are comimg from 
      the Internet, the copyright is belong to all the original author and original developer. If you 
      strayed into this site, please leave promptly, thank you.
                                                         --- Nevertheless, I very welcome your visit.
      =================================================================================================
      `
    console.log(logo)
  },
}
</script>

<style lang="scss" scoped></style>
