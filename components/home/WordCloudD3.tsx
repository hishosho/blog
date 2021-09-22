import * as d3 from 'd3'
import * as cloud from 'd3-cloud'
import { useEffect, useContext, useCallback } from 'react'
import { Context } from '../../store'

interface Size {
  width: number;
  height: number;
}

interface childProps {
  words: [];
  contentSize: Size;
  changeWordFlag: boolean;
  selectWord: Function;
}

const WordCloudD3 = (props: childProps) => {
  const { globalState } = useContext<any>(Context)
  const { words,
          contentSize,
          changeWordFlag,
          selectWord
        } = props

  const draw = useCallback((words: []) => {
    d3.select('#wordCloud').append('svg')
      .attr('width', contentSize.width)
      .attr('height', contentSize.height)
      .append('g')
        .attr('transform', `translate(${contentSize.width / 2},${contentSize.height / 2})`)
      .selectAll('text')
        .data(words)
      .enter().append('text')
        .style('font-size', (d: any) => `${d.size}px`)
        .style('font-family', (d: any) => d.length > 2 ? 'Times' : 'Impact')
        .style('fill', (d: any) => d.color)
        .style('cursor', (d: any) => d.path ? 'pointer' : '')
        .attr('id', (d: any) => d.id)
        .attr('font-weight', (d: any) => d.path ? 'bold' : '')
        .attr('text-anchor', 'middle')
        .attr('stroke-width', 2)
        .attr('stroke', (d: any) => d.path ? '#ddff55' : '')
        .on('click', (e: any, d: any) => d.path && selectWord(d.path))
        .transition()
          .duration(600)
          .attr('transform', (d: any) => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
          .style('fill-opacity', 1)
        .text((d: any) => d.text)
  }, [contentSize, selectWord])

  const buildCloud = useCallback(() => {
    words.map((d: any) => {
      let size: number = 0
      const colors: string[] = ['', '#6F69AC', '#95DAC1', '#FF6B6B', '#FD6F96']
      let color: string = colors[Math.floor(Math.random() * 4 + 1)]
      if (d.path) {
        size = 80
        color = '#95DAC1'
      } else if (globalState.isMobile) {
        size = words.length > 5 ? 5 : 10 + Math.random() * 50
      } else {
        size = words.length > 5 ? 20 : 10 + Math.random() * 90
      }
      
      d.color = color
      d.size = size
    })
    cloud.default()
      .size([contentSize.width, contentSize.height])
      .words(words)
      .padding(20)
      .rotate(() => (~~(Math.random() * 6) - 3) * 30)
      .font('Impact')
      .spiral('archimedean')
      .fontSize((d: any) => d.size)
      .on('end', draw)
      .start()
  }, [contentSize, draw, words, globalState])
  
  useEffect(() => {
    d3.selectAll('svg').remove()
    if (globalState.clientSize.width === 0 && globalState.clientSize.height === 0) return
    buildCloud()
  }, [buildCloud, globalState, changeWordFlag])

  return <div id='wordCloud'></div>
}

  export default WordCloudD3