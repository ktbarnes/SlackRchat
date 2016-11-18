import sys, json, numpy 


def read_in():

  lines = sys.stdin.readlines()

  return json.loads(lines[0])

  # return sys.argsv[1]


def main():

  lines = read_in()

  numpy_lines = numpy.array(lines)

  lines_sum = numpy.sum(numpy_lines)

  print lines_sum

  sys.stdout.flush()


if __name__ == '__main__':

  main()

