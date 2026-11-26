/** Sitecore Technology MVP awards, newest first. Add a new entry (and badge image) each year. */
const mvpAwards = [
  { year: 2026, src: '/static/images/Logos/2026-Sitecore_MVP_Technology.png' },
  { year: 2025, src: '/static/images/Logos/2025-Sitecore-MVP-Technology.png' },
  { year: 2024, src: '/static/images/Logos/2024-Sitecore-MVP-Technology.png' },
  { year: 2023, src: '/static/images/Logos/2023-Sitecore-MVP-Technology.jpg' },
  { year: 2022, src: '/static/images/Logos/2022-Sitecore-MVP-Technology.jpg' },
  { year: 2021, src: '/static/images/Logos/2021-Sitecore-MVP-Technology.jpg' },
]

export const mvpYearsLabel = `${mvpAwards[mvpAwards.length - 1].year}–${mvpAwards[0].year}`

export default mvpAwards
