import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: "Helvetica", fontSize: 11, color: "#000" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 4 },
  desc: { fontSize: 11, color: "#444", marginBottom: 8 },
  info: { fontSize: 10, color: "#555", marginBottom: 10 },
  head: { fontSize: 13, fontWeight: "bold", marginTop: 12, marginBottom: 4 },
  row: { flexDirection: "row", marginBottom: 2 },
  label: { fontSize: 11, flex: 1 },
  val: { fontSize: 11, color: "#555" },
  step: { flexDirection: "row", marginBottom: 4 },
  sno: { fontSize: 11, fontWeight: "bold", width: 16, marginRight: 4 },
  stitle: { fontSize: 11, fontWeight: "bold" },
  sinstr: { fontSize: 11, color: "#333", marginTop: 1 },
  stip: { fontSize: 10, color: "#666", fontStyle: "italic", marginTop: 1 },
  nut: { flexDirection: "row", marginBottom: 2 },
  nutT: { fontSize: 11, fontWeight: "bold", marginRight: 4 },
  nutL: { fontSize: 11, color: "#555" },
  sub: { marginBottom: 3 },
  subT: { fontSize: 11, marginBottom: 1 },
  subA: { fontSize: 10, color: "#555", marginRight: 4 },
  foot: { marginTop: 24, borderTopWidth: 0.5, borderTopColor: "#aaa", paddingTop: 6, alignItems: "center" },
  footT: { fontSize: 9, color: "#999" },
});

function RecipePDF({ recipe }) {
  const r = recipe;
  const total = (r?.prepTime || 0) + (r?.cookTime || 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{r?.title || "Recipe"}</Text>
        {r?.description ? <Text style={styles.desc}>{r.description}</Text> : null}

        <View style={styles.info}>
          {total > 0 ? <Text>Time: {total} min</Text> : null}
          {r?.servings ? <Text>Servings: {r.servings}</Text> : null}
          {r?.difficulty ? <Text>Difficulty: {r.difficulty}</Text> : null}
          {r?.cuisine ? <Text>Cuisine: {r.cuisine}</Text> : null}
          {r?.category ? <Text>Category: {r.category}</Text> : null}
          {r?.diet && r.diet.toLowerCase() !== "none" ? <Text>Diet: {r.diet}</Text> : null}
          {r?.isVeg !== undefined ? <Text>Type: {r.isVeg ? "Vegetarian" : "Non-Vegetarian"}</Text> : null}
        </View>

        <Text style={styles.head}>Ingredients</Text>
        {(r?.ingredients || []).map((item, i) => (
          <View key={i} style={styles.row}>
            <Text style={styles.label}>• {item.item}{item.category ? ` (${item.category})` : ""}</Text>
            <Text style={styles.val}>{item.amount}</Text>
          </View>
        ))}

        <Text style={styles.head}>Instructions</Text>
        {(r?.instructions || []).map((step, i) => (
          <View key={i} style={styles.step}>
            <Text style={styles.sno}>{step.step || i + 1}.</Text>
            <View style={{flex: 1}}>
              {step.title ? <Text style={styles.stitle}>{step.title}</Text> : null}
              <Text style={styles.sinstr}>{step.instruction}</Text>
              {step.tip ? <Text style={styles.stip}>Tip: {step.tip}</Text> : null}
            </View>
          </View>
        ))}

        {r?.nutrition ? (
          <>
            <Text style={styles.head}>Nutrition (per serving)</Text>
            {[
              ["Calories", r.nutrition.calories, "kcal"],
              ["Protein", r.nutrition.protein, "g"],
              ["Carbs", r.nutrition.carbs, "g"],
              ["Fat", r.nutrition.fat, "g"],
            ].map((n, i) =>
              n[1] ? (
                <View key={i} style={styles.nut}>
                  <Text style={styles.nutT}>{n[1]}</Text>
                  <Text style={styles.nutL}>{n[0]} ({n[2]})</Text>
                </View>
              ) : null
            )}
          </>
        ) : null}

        {r?.substitutions?.length > 0 ? (
          <>
            <Text style={styles.head}>Substitutions</Text>
            {r.substitutions.map((s, i) => (
              <View key={i} style={styles.sub}>
                <Text style={styles.subT}>Instead of <Text style={{fontWeight:"bold"}}>{s.original}</Text>:</Text>
                <View style={{flexDirection:"row", flexWrap:"wrap"}}>
                  {(s.alternatives || []).map((a, j) => (
                    <Text key={j} style={styles.subA}>{a}{j < s.alternatives.length - 1 ? "," : ""}</Text>
                  ))}
                </View>
              </View>
            ))}
          </>
        ) : null}

        <View style={styles.foot}>
          <Text style={styles.footT}>Made with ChefSense</Text>
        </View>
      </Page>
    </Document>
  );
}

export default RecipePDF;
