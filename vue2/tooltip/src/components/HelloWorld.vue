<script>
export default {
  data() {
    return { name: "Bob Belcher" }; 
  },
  render(createElement) {
    return createElement("div", { attrs: { id: "foobar" } }, [
        createElement("h1", this.name),
        createElement("h2", this.name)
    ]);
  }
}
</script>
